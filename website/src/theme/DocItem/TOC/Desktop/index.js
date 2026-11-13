/**
 * Swizzled from @docusaurus/theme-classic 2.4: the page title is the first entry
 * of the table of contents (see ../tocWithTitle.js).
 */
import React from "react";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import TOC from "@theme/TOC";
import tocWithTitle from "../tocWithTitle";

export default function DocItemTOCDesktop() {
    const { toc, frontMatter, metadata } = useDoc();
    const minLevel = frontMatter.toc_min_heading_level ?? 2;
    return (
        <TOC
            toc={tocWithTitle(toc, metadata.title, minLevel)}
            minHeadingLevel={frontMatter.toc_min_heading_level}
            maxHeadingLevel={frontMatter.toc_max_heading_level}
            className={ThemeClassNames.docs.docTocDesktop}
        />
    );
}
