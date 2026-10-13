/**
 * Swizzled from @docusaurus/theme-mermaid 2.4.0.
 *
 * The stock component renders synchronously (`mermaid.render`). Some Mermaid
 * 9.x diagram types, such as `mindmap`, are lazy-loaded and only work with
 * `renderAsync`; the stock component crashes the page for them. This one
 * renders asynchronously and shows the error inline instead of crashing.
 */
import React, { useEffect, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import mermaid from "mermaid";
import {
    MermaidContainerClassName,
    useMermaidConfig,
} from "@docusaurus/theme-mermaid/client";
import styles from "./styles.module.css";

function MermaidDiagram({ value }) {
    const config = useMermaidConfig();
    const [svg, setSvg] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const id = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;
        mermaid.mermaidAPI.initialize(config);
        mermaid.mermaidAPI
            .renderAsync(id, value)
            .then((result) => {
                if (cancelled) return;
                setError(null);
                setSvg(typeof result === "string" ? result : result.svg);
            })
            .catch((e) => {
                if (!cancelled) setError(String(e && e.message ? e.message : e));
            });
        return () => {
            cancelled = true;
        };
    }, [value, config]);

    if (error) {
        return (
            <pre className={styles.error}>Mermaid diagram error: {error}</pre>
        );
    }
    return (
        <div
            className={`${MermaidContainerClassName} ${styles.container}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

export default function Mermaid(props) {
    return <BrowserOnly>{() => <MermaidDiagram {...props} />}</BrowserOnly>;
}
