import React, { Children, cloneElement, isValidElement, useState } from "react";
import Lightbox from "@site/src/components/Lightbox";
import styles from "./styles.module.css";

/**
 * Side-by-side columns of plain Markdown, for example bullet points next to a screenshot,
 * or two screenshots with bullet points below each:
 *
 *   <Columns widths="70 30">
 *   <Column>
 *
 *   - First point
 *   - Second point
 *
 *   </Column>
 *   <Column>
 *
 *   ![Alt text](./img/a.png "Caption")
 *
 *   </Column>
 *   </Columns>
 *
 * Columns
 *   widths   share of the row for each column, in order, such as "70 30" or "50 50".
 *            Without it the columns are equal
 *   stackAt  screen width in px below which the columns stack, first one on top (default 600)
 *
 * Column     holds any Markdown. An image on a line of its own gets its title as a caption
 *            below it, and opens full size on click.
 */

// A Markdown image on a line of its own: an <img> element wrapped in a <p>
function lineImage(node) {
    if (!isValidElement(node)) return null;
    if (node.props && node.props.src) return node;
    const kids = Children.toArray(node.props && node.props.children);
    return kids.length === 1 && isValidElement(kids[0]) && kids[0].props && kids[0].props.src
        ? kids[0]
        : null;
}

function Figure({ src, alt = "", title = "" }) {
    const [open, setOpen] = useState(false);
    return (
        <figure className={styles.figure}>
            <button type="button" className={styles.thumb} onClick={() => setOpen(true)}>
                <img src={src} alt={alt} loading="lazy" />
            </button>
            {title ? <figcaption>{title}</figcaption> : null}
            {open ? <Lightbox src={src} alt={alt} caption={title} onClose={() => setOpen(false)} /> : null}
        </figure>
    );
}

export function Column({ children, basis }) {
    return (
        <div className={styles.column} style={basis ? { "--column-basis": basis } : undefined}>
            {Children.map(children, (child) => {
                const img = lineImage(child);
                return img ? <Figure {...img.props} /> : child;
            })}
        </div>
    );
}

export function Columns({ children, widths, stackAt = 600 }) {
    const shares = widths ? String(widths).trim().split(/[\s/,]+/).map(Number) : [];
    const columns = Children.toArray(children).filter(isValidElement);
    const id = `columns-${stackAt}`;
    return (
        <div className={`${styles.columns} ${id}`}>
            <style>{`@media (max-width: ${stackAt}px) { .${id} { flex-direction: column; } .${id} > * { flex: 1 1 auto !important; width: 100%; } }`}</style>
            {columns.map((col, i) =>
                cloneElement(col, { key: i, basis: shares[i] ? `${shares[i]}%` : undefined }),
            )}
        </div>
    );
}

export default Columns;
