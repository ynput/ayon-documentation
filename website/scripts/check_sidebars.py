"""List the docs pages that are in no sidebar.

    python scripts/check_sidebars.py

Every page is listed by hand in sidebars.js, so a new page shows in the navigation
only after it is added there. Run this after `yarn build` (it reads the metadata the
build writes to .docusaurus). Exit code 1 if a page is missing.
"""
from __future__ import annotations

import glob
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    found = glob.glob(str(ROOT / ".docusaurus" / "docusaurus-plugin-content-docs" / "default"
                          / "version-current-metadata-prop-*.json"))
    if not found:
        print("No build metadata found: run `yarn build` first.")
        return 1
    meta = json.loads(Path(found[0]).read_text(encoding="utf-8"))
    missing = sorted(doc_id for doc_id, doc in meta["docs"].items() if not doc.get("sidebar"))
    for doc_id in missing:
        print(f"  not in a sidebar: {doc_id}")
    print(f"{len(meta['docs'])} pages, {len(missing)} not in a sidebar")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
