import React from "react";
import { useDoc } from "@docusaurus/theme-common/internal";
import styles from "@site/src/components/AddonInfo/styles.module.css";

/**
 * Info box of a web UI page, styled like the addon info box. Reads the page's
 * front matter, so a page only needs to write <PageInfo /> under its title:
 *
 *   ui_purpose: "..."         one or two sentences: what the page is for
 *   ui_location: "Home > Tasks"  how to reach it in the web app
 *   ui_url: /dashboard/tasks  URL path
 *   ui_shortcut: h+h          keyboard shortcut, if any
 *   ui_access: "..."          who can open it
 *   verified: 2026-11-07      date the page was last checked against the code
 */
function formatDate(value) {
    return value instanceof Date
        ? value.toISOString().slice(0, 10)
        : String(value).slice(0, 10);
}

export default function PageInfo() {
    const { frontMatter } = useDoc();
    const {
        ui_purpose: purpose,
        ui_location: location,
        ui_url: url,
        ui_shortcut: shortcut,
        ui_access: access,
        verified,
    } = frontMatter;
    return (
        <dl className={styles.info}>
            {location ? (
                <div>
                    <dt>Location</dt>
                    <dd>{location}</dd>
                </div>
            ) : null}
            {url ? (
                <div>
                    <dt>URL path</dt>
                    <dd>
                        <code>{url}</code>
                    </dd>
                </div>
            ) : null}
            {shortcut ? (
                <div>
                    <dt>Shortcut</dt>
                    <dd>
                        <kbd>{shortcut}</kbd>
                    </dd>
                </div>
            ) : null}
            {access ? (
                <div>
                    <dt>Access</dt>
                    <dd>{access}</dd>
                </div>
            ) : null}
            {verified ? (
                <div>
                    <dt>Checked</dt>
                    <dd>{formatDate(verified)}</dd>
                </div>
            ) : null}
            {purpose ? (
                <div className={styles.grow}>
                    <dt>Purpose</dt>
                    <dd className={styles.hint}>{purpose}</dd>
                </div>
            ) : null}
        </dl>
    );
}
