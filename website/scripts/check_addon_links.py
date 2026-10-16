"""Check the source repositories and the external links of the addon pages.

    python scripts/check_addon_links.py [--json report.json] [--skip-external]

1. For every addon page with an `addon_repo`: ask GitHub (`gh api`, falling back to the
   unauthenticated REST API) whether github.com/ynput/<repo> exists, whether it was
   renamed or moved, whether it is archived (development stopped) and when it was last pushed.
   Reports addons whose page says `addon_archived` but the repository is not archived, and
   the other way round.
2. For every other external link in the addon pages: request it and report broken ones.

Exit code 1 if a source repository is missing or a link is broken.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ADDONS = Path(__file__).resolve().parent.parent / "docs" / "addons"
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)
URL = re.compile(r"https?://[^\s)>\]\"'`]+")


def front_matter(text: str) -> dict:
    block = FRONT.match(text)
    out = {}
    if block:
        for line in block.group(1).splitlines():
            m = re.match(r"^([A-Za-z_]+):\s*(.*?)\s*$", line)
            if m:
                out[m.group(1)] = m.group(2).strip("\"'")
    return out


def repo_info(repo: str) -> dict:
    """GitHub facts about ynput/<repo>."""
    try:
        out = subprocess.run(["gh", "api", f"repos/ynput/{repo}"], capture_output=True,
                             timeout=60)
        if out.returncode == 0:
            d = json.loads(out.stdout)
        else:
            msg = out.stderr.decode(errors="replace")
            return {"repo": repo, "exists": False, "error": msg.strip()[:120]}
    except FileNotFoundError:
        try:
            with urllib.request.urlopen(f"https://api.github.com/repos/ynput/{repo}", timeout=30) as r:
                d = json.load(r)
        except urllib.error.HTTPError as exc:
            return {"repo": repo, "exists": False, "error": f"HTTP {exc.code}"}
    return {"repo": repo, "exists": True, "full_name": d["full_name"], "archived": d["archived"],
            "private": d["private"], "pushed_at": d["pushed_at"][:10],
            "default_branch": d["default_branch"], "html_url": d["html_url"]}


def check_url(url: str) -> tuple[str, int | str]:
    req = urllib.request.Request(url, headers={"User-Agent": "ayonpedia-link-check"})
    for method in ("HEAD", "GET"):
        req.method = method
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return url, r.status
        except urllib.error.HTTPError as exc:
            if method == "HEAD" and exc.code in (403, 405, 400):
                continue
            return url, exc.code
        except Exception as exc:  # noqa: BLE001
            if method == "HEAD":
                continue
            return url, type(exc).__name__
    return url, "error"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json")
    ap.add_argument("--skip-external", action="store_true")
    args = ap.parse_args()

    repos: dict[str, list[str]] = {}
    urls: dict[str, list[str]] = {}
    flags: dict[str, bool] = {}
    private_flags: dict[str, bool] = {}
    for page in sorted(ADDONS.glob("*/*/*.md")):
        text = page.read_text(encoding="utf-8").replace("\r\n", "\n")
        fm = front_matter(text)
        rel = page.relative_to(ADDONS).as_posix()
        repo = fm.get("addon_repo")
        if repo and repo != "-":
            repos.setdefault(repo, []).append(rel)
            flags[repo] = fm.get("addon_archived", "").lower() == "true" or flags.get(repo, False)
            private_flags[repo] = fm.get("addon_private", "").lower() == "true" or private_flags.get(repo, False)
        body = FRONT.sub("", text, count=1)
        for u in URL.findall(body):
            u = u.rstrip(".,;")
            if re.search(r"localhost|127\.0\.0\.1|0\.0\.0\.0|contoso|example\.(com|org)|<|\{", u)                     or u.startswith("https://github.com/ynput/ayon-documentation"):
                continue
            urls.setdefault(u, []).append(rel)

    problems = 0
    with ThreadPoolExecutor(max_workers=8) as pool:
        infos = list(pool.map(repo_info, sorted(repos)))
    print("SOURCE REPOSITORIES")
    for i in infos:
        if not i["exists"]:
            problems += 1
            print(f"  MISSING   ynput/{i['repo']}  ({i.get('error')})  used by {repos[i['repo']][0]}")
            continue
        notes = []
        if i["full_name"].lower() != f"ynput/{i['repo']}".lower():
            notes.append(f"renamed to {i['full_name']}")
            problems += 1
        if i["private"] and not private_flags.get(i["repo"], False):
            notes.append("PRIVATE but the page has no addon_private flag (readers get a dead link)")
            problems += 1
        if private_flags.get(i["repo"], False) and not i["private"]:
            notes.append("page says addon_private but the repository is public")
            problems += 1
        if i["archived"]:
            notes.append(f"ARCHIVED (last push {i['pushed_at']})")
        if i["archived"] != flags.get(i["repo"], False):
            notes.append("page flag addon_archived does not match")
            problems += 1
        if notes:
            print(f"  {i['repo']:32} " + "; ".join(notes))
    print(f"  {len(infos)} repositories checked, "
          f"{sum(1 for i in infos if i.get('archived'))} archived")

    results = []
    if not args.skip_external:
        with ThreadPoolExecutor(max_workers=8) as pool:
            results = list(pool.map(check_url, sorted(urls)))
        print("\nEXTERNAL LINKS")
        # 401/403/429: the site refuses scripts but the page exists for people
        bad = [(u, c) for u, c in results
               if not (isinstance(c, int) and (c < 400 or c in (401, 403, 429)))]
        for u, c in bad:
            problems += 1
            print(f"  {c!s:>6}  {u}   ({urls[u][0]})")
        print(f"  {len(results)} links checked, {len(bad)} broken")
    if args.json:
        Path(args.json).write_text(json.dumps({"repos": infos, "links": results}, indent=1),
                                   encoding="utf-8")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
