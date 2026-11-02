/**
 * Swizzled from @docusaurus/theme-classic 2.4: the page title is the first entry
 * of the table of contents (see ../tocWithTitle.js).
 */
import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import TOCCollapsible from "@theme/TOCCollapsible";
import tocWithTitle from "../tocWithTitle";
import styles from "./styles.module.css";

export default function DocItemTOCMobile() {
    const { toc, frontMatter, metadata } = useDoc();
    const minLevel = frontMatter.toc_min_heading_level ?? 2;
    return (
        <TOCCollapsible
            toc={tocWithTitle(toc, metadata.title, minLevel)}
            minHeadingLevel={frontMatter.toc_min_heading_level}
            maxHeadingLevel={frontMatter.toc_max_heading_level}
            className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}
        />
    );
}
