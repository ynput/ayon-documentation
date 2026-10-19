import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

/**
 * Adds a search box and column filters to the Markdown tables inside it.
 *
 *   <TableFilter columns={["Type", "License"]}>
 *
 *   | Addon | Type | License |
 *   |---|---|---|
 *   | ... |
 *
 *   </TableFilter>
 *
 * The tables are plain Markdown tables, so the page HTML always contains every row
 * (crawlers and readers without JavaScript see them). The filter only hides rows in
 * the browser. `columns` limits the filters to columns with those header names;
 * without it every column with a few distinct values gets a filter.
 */
export default function TableFilter({ children, columns, placeholder = "Search the tables", labels = {}, optionLabels = {} }) {
    const root = useRef(null);
    const [filters, setFilters] = useState([]);
    const [query, setQuery] = useState("");
    const [values, setValues] = useState({});
    const [counts, setCounts] = useState({ shown: 0, total: 0 });

    // Read the tables once after the first render: build one filter per suitable column.
    useEffect(() => {
        const tables = [...root.current.querySelectorAll("table")];
        if (!tables.length) {
            return;
        }
        const headers = [...tables[0].querySelectorAll("thead th")].map((th) => th.textContent.trim());
        const found = [];
        headers.forEach((name, index) => {
            if (columns && !columns.includes(name)) {
                return;
            }
            const distinct = new Set();
            tables.forEach((t) =>
                t.querySelectorAll("tbody tr").forEach((tr) => {
                    const cell = tr.children[index];
                    if (cell) {
                        distinct.add(cell.textContent.trim());
                    }
                })
            );
            const list = [...distinct].filter(Boolean).sort();
            const short = list.every((v) => v.length < 40);
            if (list.length >= 2 && (columns || list.length <= 12) && short) {
                found.push({ name, index, options: list });
            }
        });
        setFilters(found);
    }, [columns]);

    // Apply the search and the filters to the rows.
    useEffect(() => {
        if (!root.current) {
            return;
        }
        const needle = query.trim().toLowerCase();
        let shown = 0;
        let total = 0;
        root.current.querySelectorAll("table tbody tr").forEach((tr) => {
            total += 1;
            let ok = !needle || tr.textContent.toLowerCase().includes(needle);
            filters.forEach((f) => {
                const wanted = values[f.name];
                if (ok && wanted) {
                    const cell = tr.children[f.index];
                    ok = !!cell && cell.textContent.trim() === wanted;
                }
            });
            tr.hidden = !ok;
            if (ok) {
                shown += 1;
            }
        });
        setCounts({ shown, total });

        // Hide tables without visible rows and the headings and paragraphs that only
        // introduce them; show everything again when no filter is active.
        const container = root.current;
        const blocks = [...container.children].filter((el) => !el.matches("[role=search]"));
        blocks.forEach((el) => {
            if (el.dataset.tfHidden) {
                el.style.display = "";
                delete el.dataset.tfHidden;
            }
        });
        if (needle || Object.values(values).some(Boolean)) {
            // display: none, because the theme sets a display value on tables that would
            // override the hidden attribute.
            const hide = (el) => {
                el.style.display = "none";
                el.dataset.tfHidden = "1";
            };
            const isTable = (el) => el.matches("table") || !!el.querySelector("table");
            const hasRows = (el) => !!el.querySelector("tbody tr:not([hidden])");
            blocks.forEach((el) => {
                if (isTable(el) && !hasRows(el)) {
                    hide(el);
                }
            });
            const level = (el) => (/^H[1-6]$/.test(el.tagName) ? Number(el.tagName[1]) : null);
            blocks.forEach((el, i) => {
                const lv = level(el);
                if (!lv) {
                    return;
                }
                const group = [];
                for (let j = i + 1; j < blocks.length; j++) {
                    const l2 = level(blocks[j]);
                    if (l2 && l2 <= lv) {
                        break;
                    }
                    group.push(blocks[j]);
                }
                const tables = group.filter(isTable);
                if (tables.length && tables.every((g) => g.dataset.tfHidden)) {
                    group.forEach(hide);
                    hide(el);
                }
            });
        }
    }, [query, values, filters]);

    const active = query || Object.values(values).some(Boolean);
    const clauses = [];
    if (query) {
        clauses.push(`that contain "${query}"`);
    }
    filters
        .filter((f) => values[f.name])
        .forEach((f) => clauses.push(`where ${labels[f.name] || f.name} ${optionLabels[values[f.name]] || values[f.name]}`));
    const summaryText = `Showing the rows ${clauses.join(" and ")}.`;

    return (
        <div ref={root}>
            {(
                <div className={styles.bar} role="search">
                    <input
                        type="search"
                        className={styles.search}
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label={placeholder}
                    />
                    {filters.map((f) => (
                        <label key={f.name} className={styles.field}>
                            <span>{labels[f.name] || f.name}</span>
                            <select value={values[f.name] || ""} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}>
                                <option value="">All</option>
                                {f.options.map((o) => (
                                    <option key={o} value={o}>
                                        {optionLabels[o] || o}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                    {active && (
                        <button
                            type="button"
                            className={styles.clear}
                            onClick={() => {
                                setQuery("");
                                setValues({});
                            }}
                        >
                            Clear
                        </button>
                    )}
                    <span className={styles.count} aria-live="polite">
                        {counts.total ? `${counts.shown} of ${counts.total} rows` : ""}
                    </span>
                    {active && (
                        <div className={styles.summary} aria-live="polite">
                            {summaryText}
                        </div>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
