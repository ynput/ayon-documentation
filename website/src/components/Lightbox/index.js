import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

/**
 * Full-size view of an image. Closes on a click anywhere or Escape.
 * Used by every image of the docs: plain Markdown images, Gallery and Columns.
 */
export default function Lightbox({ src, alt = "", caption = "", onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);
    if (typeof document === "undefined") return null;
    return createPortal(
        <div className={styles.lightbox} onClick={onClose} role="dialog" aria-label={alt}>
            <img src={src} alt={alt} />
            {caption ? <p>{caption}</p> : null}
        </div>,
        document.body,
    );
}
