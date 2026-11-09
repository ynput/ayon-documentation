import React, { useState } from "react";
import OriginalImg from "@theme-original/MDXComponents/Img";
import Lightbox from "@site/src/components/Lightbox";
import styles from "./styles.module.css";

/**
 * Every Markdown image of the docs (registered as `img` in MDXComponents): Docusaurus'
 * own image, which keeps its sizing, plus a full-size view on click. Images inside a link
 * keep following the link.
 */
export default function ZoomableImage(props) {
    const [open, setOpen] = useState(false);
    const onClick = (e) => {
        if (e.currentTarget.closest("a")) return;
        setOpen(true);
    };
    return (
        <>
            <OriginalImg {...props} className={`${props.className || ""} ${styles.zoomable}`} onClick={onClick} />
            {open ? <Lightbox src={props.src} alt={props.alt} caption={props.title} onClose={() => setOpen(false)} /> : null}
        </>
    );
}
