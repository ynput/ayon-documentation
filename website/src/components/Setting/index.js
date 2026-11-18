import React, { createContext, useContext } from "react";
import styles from "./styles.module.css";

/**
 * Addon settings, one entry per setting. Readable as plain text in the source and in the built
 * page: the name, the default and the description are ordinary text in a definition list, so
 * search engines, AI tools and screen readers get the same content as a person.
 *
 *   <SettingLocation uri="ayon+settings://planner/event_access" scope="Studio only" />
 *
 *   <Settings>
 *   <Setting name="Studio event access" default="No rules">
 *
 *   Access to events without a project.
 *
 *   </Setting>
 *   </Settings>
 *
 * SettingLocation  the settings URI (pasted in the URI bar of the web app, it opens the setting)
 *   uri     ayon+settings:// URI
 *   scope   optional, such as "Studio only" or "Studio, with project overrides"
 *
 * Settings         a group of Setting entries (a <dl>). Settings can be nested inside a Setting
 *                  for the fields of a list item; they are indented with a guide line.
 *   prefix  optional start of the anchors of its settings, such as "baking-stream", to keep them
 *           unique when two groups on a page have settings with the same name
 *
 * Setting          one setting
 *   name      label as shown in the settings editor
 *   default   default value as text; omit when the setting has none worth naming
 *   id        anchor; defaults to the parent anchors plus the name, such as
 *             "baking-stream-reformat-nodes"
 *   children  any Markdown (leave blank lines around it): text, lists, tables, admonitions
 */

const ParentId = createContext("");

const slug = (text) =>
    String(text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

export function SettingLocation({ uri, scope }) {
    return (
        <p className={styles.location}>
            <span className={styles.label}>Location:</span> <code>{uri}</code>
            {scope ? (
                <>
                    {" · "}
                    <span className={styles.scope}>{scope}</span>
                </>
            ) : null}
        </p>
    );
}

export function Settings({ children, prefix }) {
    const list = <dl className={styles.settings}>{children}</dl>;
    return prefix ? <ParentId.Provider value={slug(prefix)}>{list}</ParentId.Provider> : list;
}

export function Setting({ name, default: defaultValue, id, children }) {
    const parent = useContext(ParentId);
    const anchor = id || [parent, slug(name)].filter(Boolean).join("-");
    return (
        <ParentId.Provider value={anchor}>
            <div className={styles.setting}>
                <dt id={anchor} className={styles.term}>
                    <a href={`#${anchor}`} className={styles.name}>
                        {name}
                    </a>
                    {defaultValue !== undefined ? (
                        <span className={styles.default}>
                            Default: <code>{defaultValue}</code>
                        </span>
                    ) : null}
                </dt>
                <dd className={styles.description}>{children}</dd>
            </div>
        </ParentId.Provider>
    );
}

export default Setting;
