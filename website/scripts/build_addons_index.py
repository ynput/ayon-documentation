"""Regenerate docs/addons/index.md, the catalogue of all addon pages.

    python scripts/build_addons_index.py

Reads the front matter of every docs/addons/<category>/<addon>/index.md and the
`_category_.json` of every category folder, so the catalogue follows the pages:
a new addon folder shows up after running this script. The page is written
completely; do not edit docs/addons/index.md by hand.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ADDONS = Path(__file__).resolve().parent.parent / "docs" / "addons"
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


def main() -> None:
    cats = []
    for cat in sorted(p for p in ADDONS.iterdir() if p.is_dir()):
        cj = json.loads((cat / "_category_.json").read_text(encoding="utf-8"))
        rows = []
        for addon in sorted(p for p in cat.iterdir() if p.is_dir()):
            idx = addon / "index.md"
            if not idx.exists():
                continue
            fm = front_matter(idx)
            ac = json.loads((addon / "_category_.json").read_text(encoding="utf-8"))
            rows.append((ac["label"].replace(" (archived)", ""), addon.name, fm))
        cats.append((cj.get("position", 99), cat.name, cj, rows))
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
        "addons marked **unreleased** have no release yet; archived addons are still listed in the AYON Market. "
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
         "features, the integrations with 3D, 2D and compositing applications, review players, render farm managers and automation.",
         ["essentials", "pipeline-features", "3d-applications", "2d-drawing-applications",
          "compositing-editorial-applications", "review-and-media-players", "farm-managers", "automation"]),
        ("Third-party project management", "Addons that connect AYON to production trackers and other project "
         "management tools outside AYON.", ["third-party-trackers", "integrations"]),
    ]
    kinds = {"server": "Server", "pipeline-server": "Pipeline + server"}
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
    (ADDONS / "index.md").write_text("\n".join(out), encoding="utf-8", newline="\n")
    print(f"{total} addons in {len(cats)} categories -> docs/addons/index.md")


if __name__ == "__main__":
    main()
