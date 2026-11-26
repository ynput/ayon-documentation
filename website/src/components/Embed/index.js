import React from "react";
import styles from "./styles.module.css";

/**
 * Shows another site in a frame, with a link that opens it in a new tab.
 *
 *   <Embed src="https://playground.ayon.app/explorer" title="AYON playground" height="720px" />
 *
 * The other site decides whether it can be framed (X-Frame-Options or the
 * frame-ancestors directive) and whether its sign-in works inside a frame,
 * so the link stays next to the frame.
 */
export default function Embed({ src, title, height = "720px" }) {
    return (
        <div className={styles.embed}>
            <div className={styles.bar}>
                <span>{title}</span>
                <a href={src} target="_blank" rel="noopener noreferrer">
                    Open in a new tab
                </a>
            </div>
            <iframe
                className={styles.frame}
                src={src}
                title={title}
                style={{ height }}
                loading="lazy"
                allow="clipboard-read; clipboard-write; fullscreen"
            />
        </div>
    );
}
