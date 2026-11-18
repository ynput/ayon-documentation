import React from "react";
import { useDoc } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import apiDocs from "@site/src/data/addon-api-docs.json";

/**
 * Version and license badges of an addon page, like the AYON Market shows them.
 * Reads the page's front matter, so a page only needs to write <AddonInfo />
 * under its title:
 *
 *   addon: blender              name of the addon in the Market
 *   addon_repo: ayon-blender    GitHub repository (github.com/ynput/<repo>)
 *   addon_version: 1.1.11       addon version this page was written and checked for
 *   addon_flags: []             flags the Market shows: licensed, studio-only,
 *                               power-feature, beta, cloud-only
 *   verified: 2026-10-15        date the page was last checked against the code
 *
 * Comparing addon_version with the latest release tells how far a page is
 * behind (see scripts/addon_docs_status.py).
 */
export function licenseChips(flags = []) {
    const chips = [];
    if (flags.includes("studio-only")) {
        chips.push("Studio");
    } else if (flags.includes("licensed")) {
        chips.push("Pro", "Studio");
    } else {
        chips.push("Free");
    }
    return chips;
}

// Front matter dates (2026-10-15) are parsed to Date objects by the loader.
function formatDate(value) {
    return value instanceof Date
        ? value.toISOString().slice(0, 10)
        : String(value).slice(0, 10);
}

const EXTRA = {
    alpha: "Alpha",
    beta: "Beta",
    "power-feature": "Power feature",
    "cloud-only": "Cloud only",
    "cloud-required": "Cloud required",
    unreleased: "Unreleased",
};

const TYPES = {
    pipeline: {
        chips: ["pipeline"],
        hint: "Pipeline part on workstations. The server part holds the settings.",
    },
    "pipeline-server": {
        chips: ["pipeline", "server"],
        hint: "Pipeline part on workstations, plus services, pages or API endpoints on the server.",
    },
    server: {
        chips: ["server"],
        hint: "Runs on the AYON server only.",
    },
};

export default function AddonInfo() {
    const { frontMatter } = useDoc();
    const {
        addon_version: version,
        addon_repo: repo,
        addon_flags: flags = [],
        verified,
        addon_unverified: unverified,
        addon_scope: scope,
        addon_private: isPrivate,
        addon_archived: archived,
        addon_last_push: lastPush,
    } = frontMatter;
    if (!version) {
        return null;
    }
    // A reference elsewhere (`other`) is shown even for a private repository, because it
    // is a public site; the standard location only for public repositories.
    const apiDocsUrl =
        (apiDocs.other || {})[repo] ||
        (repo && !isPrivate && apiDocs.repos.includes(repo)
            ? `https://docs.ayon.dev/${repo}/latest/`
            : null);
    const extras = flags.filter((f) => EXTRA[f]);
    return (
        <dl className={styles.info} data-archived={archived ? "true" : undefined}>
            <div>
                <dt>Documented version</dt>
                <dd>v{version}</dd>
            </div>
            {scope ? (
                <div>
                    <dt>Type</dt>
                    <dd>
                        {TYPES[scope].chips.map((c) => (
                            <span key={c} className={`${styles.chip} ${styles[c]}`}>
                                {c === "server" ? "Server" : "Pipeline"}
                            </span>
                        ))}
                    </dd>
                </div>
            ) : null}
            <div>
                <dt>License</dt>
                <dd>
                    {licenseChips(flags).map((chip) => (
                        <span
                            key={chip}
                            className={`${styles.chip} ${styles[chip.toLowerCase()]}`}
                        >
                            {chip}
                        </span>
                    ))}
                    {archived ? (
                        <span className={`${styles.chip} ${styles.archived}`}>
                            Archived
                        </span>
                    ) : null}
                    {extras.map((f) => (
                        <span key={f} className={`${styles.chip} ${styles.flag}`}>
                            {EXTRA[f]}
                        </span>
                    ))}
                </dd>
            </div>
            {repo && repo !== "-" && !unverified && !isPrivate ? (
                <div>
                    <dt>Source</dt>
                    <dd>
                        <a href={`https://github.com/ynput/${repo}`} target="_blank" rel="noopener noreferrer">ynput/{repo}</a>
                    </dd>
                </div>
            ) : null}
            {archived ? (
                <div className={styles.grow}>
                    <dt>Status</dt>
                    <dd className={styles.note}>
                        Development of this addon has stopped: its repository is
                        archived{lastPush ? ` (last change ${formatDate(lastPush)})` : ""}.
                        It is still listed in the AYON Market.
                    </dd>
                </div>
            ) : null}
            {verified ? (
                <div>
                    <dt>Checked</dt>
                    <dd>{formatDate(verified)}</dd>
                </div>
            ) : null}
            {apiDocsUrl ? (
                <div className={styles.row}>
                    <dt>API docs</dt>
                    <dd>
                        <a href={apiDocsUrl} target="_blank" rel="noopener noreferrer">
                            {apiDocsUrl.replace(/^https:\/\//, "").replace(/\/$/, "")}
                        </a>
                    </dd>
                </div>
            ) : null}
            {scope ? (
                <div className={styles.grow}>
                    <dt>Note</dt>
                    <dd className={styles.hint}>{TYPES[scope].hint}</dd>
                </div>
            ) : null}
        </dl>
    );
}
