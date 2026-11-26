"""List relative links in docs/ that point to a missing page or a missing heading.

    python scripts/check_anchors.py

Docusaurus 2 warns about broken page links at build time but not about broken
anchors, so moved or split sections go unnoticed. Heading ids follow the
Docusaurus slugger (lower case, punctuation dropped, spaces to dashes, duplicates
numbered) and explicit {#id} heading ids. Anchors of the <Setting> component
(src/components/Setting) are added too: an explicit id, or the parent anchor
(the enclosing <Setting>, or the prefix of the enclosing <Settings>) joined with
the slug of the name.
"""
from __future__ import annotations

import posixpath
import re
from pathlib import Path

DOCS = Path(__file__).resolve().parent.parent / "docs"
LINK = re.compile(r"\]\(([^)\s]+?\.mdx?)?(#[^)\s]+)?\)")
HEADING = re.compile(r"^(#{1,6})\s+(.*?)\s*$", re.M)
FENCE = re.compile(r"^```.*?^```", re.M | re.S)
TAG = re.compile(r"<(/?)(Settings|Setting)\b((?:[^>\"]|\"[^\"]*\")*?)(/?)>")
ATTR = re.compile(r'(\w+)="([^"]*)"')


def component_slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def setting_anchors(text: str) -> set[str]:
    out: set[str] = set()
    stack: list[str] = [""]
    for m in TAG.finditer(text):
        closing, tag, attrs, selfclose = m.groups()
        if closing:
            if len(stack) > 1:
                stack.pop()
            continue
        a = dict(ATTR.findall(attrs))
        parent = stack[-1]
        if tag == "Settings":
            ctx = component_slug(a["prefix"]) if "prefix" in a else parent
        else:
            ctx = a.get("id") or "-".join(x for x in (parent, component_slug(a.get("name", ""))) if x)
            out.add(ctx)
        if not selfclose:
            stack.append(ctx)
    return out


def slug(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[`*_]|\[([^\]]*)\]\([^)]*\)", lambda m: m.group(1) or "", text)
    text = text.lower().strip()
    text = re.sub(r"[^\w\- ]", "", text)
    return text.replace(" ", "-")


def anchors(path: Path) -> set[str]:
    text = FENCE.sub("", path.read_text(encoding="utf-8"))
    seen: dict[str, int] = {}
    out = set()
    for _hashes, title in HEADING.findall(text):
        explicit = re.search(r"\{#([^}]+)\}\s*$", title)
        if explicit:
            out.add(explicit.group(1))
            continue
        s = slug(title)
        n = seen.get(s, 0)
        out.add(s if n == 0 else f"{s}-{n}")
        seen[s] = n + 1
    return out | setting_anchors(text)


def main() -> None:
    cache: dict[Path, set[str]] = {}
    problems = 0
    for page in sorted(DOCS.rglob("*.md*")):
        text = FENCE.sub("", page.read_text(encoding="utf-8"))
        for target, anchor in LINK.findall(text):
            if target and "://" in target:
                continue
            dest = page if not target else (page.parent / target).resolve()
            if not target and not anchor:
                continue
            rel = posixpath.relpath(page.as_posix(), DOCS.as_posix())
            if not dest.exists():
                print(f"{rel}: missing page {target}")
                problems += 1
                continue
            if anchor:
                if dest not in cache:
                    cache[dest] = anchors(dest)
                if anchor[1:] not in cache[dest]:
                    print(f"{rel}: missing anchor {target or ''}{anchor}")
                    problems += 1
    print(f"{problems} problems")


if __name__ == "__main__":
    main()
