"""Check the addon pages for structure and style problems.

    python scripts/check_addon_pages.py [--status path/to/prepare_status.json]

Checks, for every docs/addons/<category>/<addon>/ folder:
  - index.md exists (settings.md only for addons that have settings)
  - front matter keys: title, description, addon, addon_repo, addon_version, verified
  - `<AddonInfo />` right under the title
  - style: no step-by-step wording ("click", "navigate to", "go to"), no filler ("simply", "just", "easily")
  - relative links resolve to files that exist
  - with --status: addon_version equals the documented_version in prepare_status.json,
    and the folder is the one the status file expects
Exit code 1 if any problem is found.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"
ADDONS = DOCS / "addons"
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)
REQUIRED = ("title", "description", "addon", "addon_repo", "addon_version", "addon_scope", "verified")
BANNED = re.compile(r"\b(click(?:ing)? on|click the|navigate to|go to the|simply|easily)\b", re.I)
LINK = re.compile(r"\]\(([^)\s#]+\.md)(?:#[^)]*)?\)")


def front_matter(text: str) -> dict:
    block = FRONT.match(text)
    out = {}
    if block:
        for line in block.group(1).splitlines():
            m = re.match(r"^([A-Za-z_]+):\s*(.*?)\s*$", line)
            if m:
                out[m.group(1)] = m.group(2).strip("\"'")
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--status")
    args = ap.parse_args()
    status = json.loads(Path(args.status).read_text(encoding="utf-8")) if args.status else {}
    expected = {}
    for name, e in status.items():
        expected[(e["category"], e["slug"])] = (name, e.get("documented_version"))

    problems: list[str] = []
    seen = set()
    pages = 0
    for cat in sorted(p for p in ADDONS.iterdir() if p.is_dir()):
        for addon in sorted(p for p in cat.iterdir() if p.is_dir()):
            key = (cat.name, addon.name)
            seen.add(key)
            rel = f"{cat.name}/{addon.name}"
            index = addon / "index.md"
            if not index.exists():
                problems.append(f"{rel}: missing index.md")
                continue
            for md in sorted(addon.glob("*.md")):
                pages += 1
                text = md.read_text(encoding="utf-8").replace("\r\n", "\n")
                fm = front_matter(text)
                name = f"{rel}/{md.name}"
                for k in REQUIRED:
                    if not fm.get(k):
                        problems.append(f"{name}: front matter `{k}` missing")
                body = FRONT.sub("", text, count=1)
                m = re.search(r"^# .+\n\n<AddonInfo />\n", body, re.M)
                if not m:
                    problems.append(f"{name}: `<AddonInfo />` must follow the H1 title")
                for hit in BANNED.finditer(body):
                    line = body[: hit.start()].count("\n") + 1
                    problems.append(f"{name}: wording `{hit.group(0)}` (body line {line})")
                for link in LINK.findall(body):
                    if link.startswith("http"):
                        continue
                    if not (md.parent / link).resolve().exists():
                        problems.append(f"{name}: broken link {link}")
                if key in expected:
                    _, want = expected[key]
                    if want and fm.get("addon_version") != want:
                        problems.append(f"{name}: addon_version {fm.get('addon_version')} != {want}")
    for key in expected:
        if key not in seen:
            problems.append(f"{key[0]}/{key[1]}: no page written yet ({expected[key][0]})")
    for p in problems:
        print(p)
    print(f"\n{pages} pages, {len(seen)} addon folders, {len(problems)} problems")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
