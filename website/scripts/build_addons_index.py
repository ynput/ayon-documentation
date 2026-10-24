"""Regenerate docs/addons/index.md, the catalogue of all addon pages.

    python scripts/build_addons_index.py

Reads the front matter of every docs/addons/<category>/<addon>/index.md, and the
labels and descriptions of the addon categories and addons from the Addons sidebar
in sidebars.js (the single place where they are written), so the catalogue follows
the sidebar: a new addon shows up after it is added to sidebars.js and this script
runs. Needs Node.js to read sidebars.js. The page is written completely; do not
edit docs/addons/index.md by hand.

Also fills the addon API reference table of docs/developer/index.md (between its
addon-api-docs markers) from src/data/addon-api-docs.json.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

WEBSITE = Path(__file__).resolve().parent.parent
ADDONS = WEBSITE / "docs" / "addons"
API_DOCS = WEBSITE / "src" / "data" / "addon-api-docs.json"
DEV_INDEX = WEBSITE / "docs" / "developer" / "index.md"
ADDON_DOC = re.compile(r"^addons/([^/]+)/([^/]+)/index$")
FRONT = re.compile(r"\A---\n(.*?)\n---\n", re.S)


def front_matter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
    block = FRONT.match(text)
    out: dict = {}
    if block:
        for line in block.group(1).splitlines():
            m = re.match(r"^([A-Za-z_]+):\s*(.*?)\s*$", line)
            if m:
                out[m.group(1)] = m.group(2).strip("\"'")
    return out


def license_text(flags: str) -> str:
    if "studio-only" in flags:
        return "Studio"
    if "licensed" in flags:
        return "Pro, Studio"
    return "Free"


def short(text: str, limit: int = 150) -> str:
    text = " ".join(text.split())
    if len(text) <= limit:
        return text
    cut = text[: limit - 1].rsplit(" ", 1)[0]
    return cut + "..."


def sidebar_labels() -> tuple[dict, dict]:
    """Labels of the addons and of the addon categories, from the Addons sidebar.

    Returns ({(category folder, addon folder): label}, {category folder: {"label", "description"}}).
    """
    script = "process.stdout.write(JSON.stringify(require('./sidebars.js').Addons))"
    sidebar = json.loads(subprocess.run(["node", "-e", script], cwd=WEBSITE, check=True,
                                        capture_output=True, text=True, encoding="utf-8").stdout)
    addons: dict = {}
    categories: dict = {}

    def doc_label(doc_id: str) -> str:
        fm = front_matter(WEBSITE / "docs" / f"{doc_id}.md")
        return fm.get("sidebar_label") or fm.get("title", "")

    def walk(items: list) -> list:
        """Collect labels; return the category folders found below these items."""
        folders = []
        for item in items:
            if isinstance(item, str) or item.get("type") == "doc":
                doc_id = item if isinstance(item, str) else item["id"]
                m = ADDON_DOC.match(doc_id)
                if m:
                    addons[(m.group(1), m.group(2))] = doc_label(doc_id)
                    folders.append(m.group(1))
                continue
            link = item.get("link") or {}
            m = ADDON_DOC.match(link.get("id", "")) if link.get("type") == "doc" else None
            if m:
                addons[(m.group(1), m.group(2))] = item["label"]
                folders.append(m.group(1))
            below = walk(item.get("items", []))
            folders += below
            if link.get("type") == "generated-index" and below:
                categories[below[0]] = {"label": item["label"], "description": link.get("description", "")}
        return folders

    walk(sidebar)
    return addons, categories


def main() -> None:
    addon_labels, category_info = sidebar_labels()
    cats = []
    for cat in sorted(p for p in ADDONS.iterdir() if p.is_dir()):
        # a category that is not a generated list in the sidebar (production-tracking)
        # takes its label from the group that holds its addons
        cj = category_info.get(cat.name, {"label": "Production tracking" if cat.name == "production-tracking" else cat.name,
                                          "description": ""})
        cj = {"label": cj["label"], "link": {"description": cj["description"]}}
        rows = []
        for addon in sorted(p for p in cat.iterdir() if p.is_dir()):
            idx = addon / "index.md"
            if not idx.exists():
                continue
            fm = front_matter(idx)
            label = addon_labels.get((cat.name, addon.name), fm.get("title", addon.name))
            rows.append((label.replace(" (archived)", ""), addon.name, fm))
        cats.append((0, cat.name, cj, rows))
    cats.sort()

    total = sum(len(c[3]) for c in cats)
    by_folder = {c[1]: c for c in cats}
    out = [
        "---",
        "title: Addons",
        "sidebar_position: 0",
        'description: "A catalogue of AYON addons in two groups: server addons (production management, power features, single sign-on) and pipeline addons (core, 3D, 2D, compositing, trackers, review, farm, automation, integrations). For each addon: what it provides, its type, its license and its settings."',
        "---",
        "",
        "# Addons",
        "",
        "AYON is modular: integrations with applications, trackers, render farms and review tools, "
        "production management features and many pipeline features are addons. This catalogue lists "
        f"the {total} addons in three groups by scope. The groups show where an addon works, because server addons and pipeline addons are set up differently.",
        "",
        "| Type | What it is | Where it runs |",
        "|---|---|---|",
        "| **Server** | An addon with no pipeline part: web app features, services or sign-in options. | On the AYON server only. |",
        "| **Pipeline** | An addon with a pipeline part (a `client` folder in its repository) next to its server part, which holds the settings. | On workstations, in the launcher and in applications, plus the server. |",
        "| **Pipeline + server** | A pipeline addon that also adds substantial server features: services, web app pages or API endpoints. | On workstations and on the AYON server. |",
        "",
        "**Pipeline addons** are part of a bundle's pipeline side, and their Python dependencies end up in the "
        "bundle's dependency package, so they need more care when a bundle is put together, and mixing "
        "addon versions needs attention. **Server addons** add no pipeline part and no dependencies to "
        "that package. Each addon page states its type in the box under the title.",
        "",
        "Every addon page states the addon version it was written and checked for, so a page can be "
        "compared with the latest release of the addon. The license column follows the AYON Market: "
        "**Free** addons are part of every edition, **Pro, Studio** addons need one of those plans, "
        "and **Studio** addons need the Studio plan. Addons marked **archived** are no longer developed and "
        "addons marked **alpha** are experimental, and addons marked **unreleased** have no release yet; archived addons are still listed in the AYON Market. "
        "See the [plans](../ayon/plans.md).",
        "",
        "How addons are installed, activated and configured is described in "
        "[how AYON works](../ayon/how-ayon-works/index.md).",
        "",
    ]
    parts = [
        ("Production tracking", "AYON's own production tracking features: planning, reports, node graphs, review sessions, "
         "power features and user access (single sign-on, Ynput Cloud login and support). Most of them are Pro or Studio "
         "addons. They run on the AYON server, so AYON is more than a pipeline tool.",
         ["production-tracking", "server-features"]),
        ("Pipeline addons", "Everything with a pipeline part that runs on workstations: the core, publishing and delivery "
         "features, the integrations with 3D, 2D and compositing applications, review players, render farm managers, automation and AI tooling.",
         ["essentials", "pipeline-features", "3d-applications", "2d-drawing-applications",
          "compositing-editorial-applications", "review-and-media-players", "farm-managers", "automation", "ai"]),
        ("Third-party project management", "Addons that connect AYON to production trackers and other project "
         "management tools outside AYON.", ["third-party-trackers", "integrations"]),
    ]
    kinds = {"server": "Server", "pipeline-server": "Pipeline + server"}
    out += [
        '<TableFilter columns={["Type", "License"]} placeholder="Search the addons">',
        "",
    ]
    for part_title, part_desc, folders in parts:
        out += [f"## {part_title}", "", part_desc, ""]
        for folder in folders:
            _pos, _f, cj, rows = by_folder[folder]
            label = cj["label"]
            desc = cj.get("link", {}).get("description", "")
            if label != part_title:
                out += [f"### {label}", "", desc, ""]
            out += ["| Addon | Type | Version | License | What it is |", "|---|---|---|---|---|"]
            for addon_label, slug, fm in rows:
                link = f"{folder}/{slug}/index.md"
                version = fm.get("addon_version", "")
                lic = license_text(fm.get("addon_flags", ""))
                status = []
                if "alpha" in fm.get("addon_flags", ""):
                    status.append("alpha")
                if "unreleased" in fm.get("addon_flags", ""):
                    status.append("unreleased")
                if fm.get("addon_archived", "").lower() == "true":
                    status.append("archived")
                if status:
                    addon_label += f" ({', '.join(status)})"
                kind = kinds.get(fm.get("addon_scope"), "Pipeline")
                what = short(fm.get("description", ""))
                out.append(f"| [{addon_label}]({link}) | {kind} | {version} | {lic} | {what} |")
            out.append("")
    out += ["</TableFilter>", ""]
    (ADDONS / "index.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"{total} addons in {len(cats)} categories -> docs/addons/index.md")
    build_dev_api_table(addon_labels)


def build_dev_api_table(addon_labels: dict) -> None:
    """Fill the addon table of docs/developer/index.md (API docs) between its markers."""
    api = json.loads(API_DOCS.read_text(encoding="utf-8"))
    urls = {repo: f"https://docs.ayon.dev/{repo}/latest/" for repo in api["repos"]}
    urls.update(api.get("other", {}))
    text = DEV_INDEX.read_text(encoding="utf-8")
    start = text.index("<!-- addon-api-docs:start")
    start = text.index("\n", start) + 1
    end = text.index("<!-- addon-api-docs:end -->")
    rows = []
    for idx in ADDONS.glob("*/*/index.md"):
        repo = front_matter(idx).get("addon_repo", "")
        if repo not in urls:
            continue
        cat, slug = idx.parent.parent.name, idx.parent.name
        label = addon_labels.get((cat, slug), slug).replace(" (archived)", "")
        site = urls[repo].split("://", 1)[1].rstrip("/").removesuffix("/latest")
        rows.append((label.lower(), f"| {label} | [{label} addon](../addons/{cat}/{slug}/index.md) | [{site}]({urls[repo]}) |"))
    missing = set(urls) - {r for r in (front_matter(i).get("addon_repo", "") for i in ADDONS.glob("*/*/index.md"))}
    if missing:
        raise SystemExit(f"no addon page for {sorted(missing)} in {API_DOCS.name}")
    # HTML comments as markers: MDX v1 drops them, while it prints a {/* */} comment as text
    table = [
        "",
        '<TableFilter columns={[]} placeholder="Search the addons">',
        "",
        "| Addon | Page here | API docs |",
        "|---|---|---|",
        *(row for _key, row in sorted(rows)),
        "",
        "</TableFilter>",
        "",
    ]
    DEV_INDEX.write_text(text[:start] + "\n".join(table) + "\n" + text[end:], encoding="utf-8", newline="\n")
    print(f"{len(rows)} addon API references -> docs/developer/index.md")


if __name__ == "__main__":
    main()
