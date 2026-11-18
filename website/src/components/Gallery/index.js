import React, { Children, isValidElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Lightbox from "@site/src/components/Lightbox";

/**
 * A gallery of screenshots, written with plain Markdown images inside it, so the page
 * source stays readable. The image title becomes the caption:
 *
 *   <Gallery columns={3} rows={1} more="show-all">
 *
 *   ![Alt text](./img/a.png "Caption")
 *   ![Alt text](./img/b.png "Caption")
 *
 *   </Gallery>
 *
 * columns   maximum number of screenshots per row, or "auto" to fit as many as the width
 *           allows. On narrow screens a row always holds fewer (default "auto")
 * rows      number of visible rows, with more="show-all" or "scroll" (default 1).
 *           With more="none" it has no effect: every screenshot is shown, in as many rows
 *           as needed
 * more      what happens to the screenshots that do not fit in those rows:
 *           "none" adds rows for them, "show-all" hides them behind a button,
 *           "scroll" keeps the rows and scrolls sideways (default "none")
 * minWidth  smallest width of a screenshot in px, which decides how many fit (default 220)
 * fit       "cover" crops each thumbnail to the same 16:10 frame from its top left corner;
 *           "contain" shows the whole screenshot, for wide strips (default "cover")
 *
 * All images are in the HTML of the page, hidden ones too, so search and AI crawlers see
 * their alt text. Clicking an image opens it full size.
 */

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const GAP = 16;

// Markdown images arrive as <img> elements, usually wrapped in a <p> per line
function collectImages(children, found = []) {
    Children.forEach(children, (child) => {
        if (!isValidElement(child)) return;
        if (child.props && child.props.src) {
            found.push({ src: child.props.src, alt: child.props.alt || "", title: child.props.title || "" });
        } else if (child.props && child.props.children) {
            collectImages(child.props.children, found);
        }
    });
    return found;
}

export default function Gallery({ children, columns = "auto", rows = 1, more = "none", minWidth = 220, fit = "cover" }) {
    const images = collectImages(children);
    const ref = useRef(null);
    const [perRow, setPerRow] = useState(typeof columns === "number" ? columns : 3);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(null);

    useIsomorphicLayoutEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const update = () => {
            const fit = Math.max(1, Math.floor((el.clientWidth + GAP) / (minWidth + GAP)));
            setPerRow(typeof columns === "number" ? Math.min(columns, fit) : fit);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [columns, minWidth]);

    const visible = perRow * rows;
    const hiddenCount = more === "show-all" && !expanded ? Math.max(0, images.length - visible) : 0;
    const isScroll = more === "scroll";

    const style = isScroll
        ? {
              gridTemplateRows: `repeat(${Math.min(rows, images.length)}, auto)`,
              gridAutoFlow: "column",
              gridAutoColumns: `calc((100% - ${(perRow - 1) * GAP}px) / ${perRow})`,
          }
        : { gridTemplateColumns: `repeat(${perRow}, minmax(0, 1fr))` };

    return (
        <div className={styles.gallery}>
            <div ref={ref} className={`${styles.grid} ${isScroll ? styles.scroll : ""} ${fit === "contain" ? styles.contain : ""}`} style={style}>
                {images.map((img, i) => (
                    <figure
                        key={img.src + i}
                        className={styles.item}
                        hidden={more === "show-all" && !expanded && i >= visible}
                    >
                        <button type="button" className={styles.thumb} onClick={() => setOpen(i)}>
                            <img src={img.src} alt={img.alt} loading="lazy" />
                        </button>
                        {img.title ? <figcaption>{img.title}</figcaption> : null}
                    </figure>
                ))}
            </div>
            {more === "show-all" && images.length > visible ? (
                <button type="button" className={styles.more} onClick={() => setExpanded(!expanded)}>
                    {expanded ? "Show fewer" : `Show all (+${hiddenCount} more)`}
                </button>
            ) : null}
            {open !== null ? (
                <Lightbox src={images[open].src} alt={images[open].alt} caption={images[open].title} onClose={() => setOpen(null)} />
            ) : null}
        </div>
    );
}
