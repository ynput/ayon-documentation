"""Report how far the addon pages are behind the addons' latest releases.

Every addon page (docs/addons/**/index.md) records the addon version it was
written and checked for in its front matter:

    addon_repo: ayon-blender      GitHub repository under github.com/ynput
    addon_version: 1.1.11         documented version

For each page this script lists the stable release tags of the repository
(`git ls-remote`, no clone and no token needed for public repositories) and
counts how many are newer than the documented version.

    python scripts/addon_docs_status.py
    python scripts/addon_docs_status.py --fail-behind 5     # exit 1 if any page is >= 5 releases behind
    python scripts/addon_docs_status.py --json report.json

Only the standard library is used.
"""
from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs" / "addons"
SEMVER = re.compile(r"^v?(\d+)\.(\d+)\.(\d+)$")
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)


def semver(tag: str):
    match = SEMVER.match(tag)
    return tuple(int(x) for x in match.groups()) if match else None


def front_matter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    block = FRONT.match(text)
    out = {}
    if block:
        for line in block.group(1).splitlines():
            m = re.match(r"^([A-Za-z_]+):\s*(.*?)\s*$", line)
            if m:
                out[m.group(1)] = m.group(2).strip("\"'")
    return out


def remote_tags(repo: str) -> list[str]:
    url = f"https://github.com/ynput/{repo}.git"
    try:
        out = subprocess.run(
            ["git", "ls-remote", "--tags", "--refs", url],
            check=True, capture_output=True, timeout=60,
        ).stdout.decode()
    except Exception:
        return []
    return [line.split("refs/tags/")[-1] for line in out.splitlines()]


def check(page: Path) -> dict:
    fm = front_matter(page)
    repo, documented = fm.get("addon_repo"), fm.get("addon_version")
    row = {
        "page": page.relative_to(DOCS.parent).as_posix(),
        "repo": repo, "documented": documented, "verified": fm.get("verified"),
        "latest": None, "behind": None,
    }
    if not repo or not documented or not semver(documented):
        row["note"] = "missing addon_repo / addon_version"
        return row
    tags = sorted((t for t in remote_tags(repo) if semver(t)), key=semver)
    if not tags:
        row["note"] = "no tags found (private repository?)"
        return row
    row["latest"] = tags[-1]
    row["behind"] = sum(1 for t in tags if semver(t) > semver(documented))
    return row


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", help="also write the report to this file")
    ap.add_argument("--fail-behind", type=int, default=0,
                    help="exit with 1 if a page is at least this many releases behind")
    args = ap.parse_args()

    pages = sorted(DOCS.glob("*/*/index.md"))
    with ThreadPoolExecutor(max_workers=8) as pool:
        rows = list(pool.map(check, pages))

    width = max((len(r["page"]) for r in rows), default=10)
    print(f"{'page':{width}}  documented  latest      behind  checked")
    for r in rows:
        behind = "?" if r["behind"] is None else r["behind"]
        print(f"{r['page']:{width}}  {str(r['documented']):10}  "
              f"{str(r['latest']):10}  {behind!s:6}  {r.get('verified') or ''}"
              f"  {r.get('note', '')}")
    stale = [r for r in rows if r["behind"]]
    print(f"\n{len(rows)} addon pages, {len(stale)} behind the latest release")
    if args.json:
        Path(args.json).write_text(json.dumps(rows, indent=1), encoding="utf-8")
    if args.fail_behind and any(
            (r["behind"] or 0) >= args.fail_behind for r in rows):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
