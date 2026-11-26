/**
 * Swizzled from @docusaurus/theme-mermaid 2.4.0.
 *
 * The stock component renders synchronously (`mermaid.render`). Some Mermaid
 * 9.x diagram types, such as `mindmap`, are lazy-loaded and only work with
 * `renderAsync`; the stock component crashes the page for them. This one
 * renders asynchronously and shows the error inline instead of crashing.
 *
 * Diagrams can show Material Symbols, the icons of the AYON web app, with
 * `<span class='material-symbols-outlined'>folder</span>` in a node label.
 *
 * Mermaid 9.x draws a subgraph title on the top edge of its box without making
 * room for it, so the boxes inside touch the title. After rendering, each
 * subgraph box is grown upward to give its title a row of its own.
 *
 * The theme variables in docusaurus.config.js are the dark AYON colors; on the light
 * theme the light ones below replace them (the `-light` tokens of the web app).
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import mermaid from "mermaid";
import {
    MermaidContainerClassName,
    useMermaidConfig,
} from "@docusaurus/theme-mermaid/client";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

const LIGHT_THEME_VARIABLES = {
    darkMode: false,
    background: "#f8f9fb",
    primaryColor: "#ffffff",
    primaryTextColor: "#1a1e23",
    primaryBorderColor: "#0b76ba",
    secondaryColor: "#eef1f4",
    secondaryTextColor: "#1a1e23",
    secondaryBorderColor: "#ccd3db",
    tertiaryColor: "#eef1f4",
    tertiaryTextColor: "#1a1e23",
    tertiaryBorderColor: "#ccd3db",
    lineColor: "#545d68",
    textColor: "#1a1e23",
    mainBkg: "#ffffff",
    nodeBorder: "#0b76ba",
    clusterBkg: "#eef1f4",
    clusterBorder: "#ccd3db",
    edgeLabelBackground: "#f8f9fb",
};

const TITLE_GAP = 8;
const TRANSLATE = /translate\(\s*([-\d.e]+)[\s,]+([-\d.e]+)\s*\)/;

function spaceSubgraphTitles(svg) {
    // Only the top is checked vertically: an inner subgraph may have grown past the bottom.
    const contains = (outer, inner) =>
        inner.left >= outer.left - 1 &&
        inner.right <= outer.right + 1 &&
        inner.top >= outer.top - 1 &&
        inner.top <= outer.bottom;
    // Inner subgraphs first, so an outer one makes room for an inner one already grown.
    const clusters = [...svg.querySelectorAll("g.cluster")]
        .map((cluster) => ({
            cluster,
            rect: cluster.querySelector(":scope > rect"),
            label: cluster.querySelector(":scope > .cluster-label"),
        }))
        .filter(({ rect, label }) => rect && label && label.textContent.trim())
        .sort((a, b) => {
            const ra = a.rect.getBBox();
            const rb = b.rect.getBBox();
            return ra.width * ra.height - rb.width * rb.height;
        });
    const overlaps = (a, b) =>
        a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    const edges = [...svg.querySelectorAll(".edgePaths path")];
    let changed = false;
    for (const { cluster, rect, label } of clusters) {
        const box = rect.getBoundingClientRect();
        const scale = box.height / rect.getBBox().height || 1;
        const children = [...svg.querySelectorAll(".node, .cluster > rect")]
            .filter((el) => el !== rect && !cluster.contains(el))
            .map((el) => el.getBoundingClientRect())
            .filter((inner) => contains(box, inner));
        if (!children.length) continue;
        // Positions in the subgraph's own units.
        const local = (clientY) => y + (clientY - box.top) / scale;
        const labelBox = label.getBoundingClientRect();
        const labelHeight = labelBox.height / scale;
        const y = Number(rect.getAttribute("y"));
        let height = Number(rect.getAttribute("height"));
        const childTop = local(Math.min(...children.map((b) => b.top)));
        const childBottom = local(Math.max(...children.map((b) => b.bottom)));
        if (childBottom + TITLE_GAP > y + height) {
            height = childBottom + TITLE_GAP - y;
            rect.setAttribute("height", height);
            changed = true;
        }
        let titleY;
        // A title that an arrow would cross, such as one entering the box from
        // above, goes to the bottom of the box instead.
        if (edges.some((edge) => overlaps(edge.getBoundingClientRect(), labelBox))) {
            height = Math.max(height, childBottom + 1.5 * TITLE_GAP + labelHeight - y);
            rect.setAttribute("height", height);
            titleY = y + height - labelHeight - TITLE_GAP / 2;
        } else {
            const grow = TITLE_GAP - (childTop - local(labelBox.bottom));
            if (grow <= 0) continue;
            rect.setAttribute("y", y - grow);
            rect.setAttribute("height", height + grow);
            titleY = y - grow;
        }
        const transform = label.getAttribute("transform") || "";
        const match = transform.match(TRANSLATE);
        if (match) {
            label.setAttribute(
                "transform",
                transform.replace(TRANSLATE, `translate(${match[1]}, ${titleY})`),
            );
        }
        changed = true;
    }
    if (changed) {
        const margin = 8;
        const bbox = svg.getBBox();
        const width = bbox.width + 2 * margin;
        svg.setAttribute(
            "viewBox",
            `${bbox.x - margin} ${bbox.y - margin} ${width} ${bbox.height + 2 * margin}`,
        );
        svg.style.maxWidth = `${width}px`;
    }
}

function MermaidDiagram({ value }) {
    const baseConfig = useMermaidConfig();
    const { colorMode } = useColorMode();
    const config = React.useMemo(
        () =>
            colorMode === "light"
                ? {
                      ...baseConfig,
                      themeVariables: { ...baseConfig.themeVariables, ...LIGHT_THEME_VARIABLES },
                  }
                : baseConfig,
        [baseConfig, colorMode],
    );
    const [svg, setSvg] = useState("");
    const [error, setError] = useState(null);
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const svgElement = containerRef.current?.querySelector("svg");
        if (svgElement) spaceSubgraphTitles(svgElement);
    }, [svg]);

    useEffect(() => {
        let cancelled = false;
        const id = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;
        // initialize() writes the derived theme variables (text colors and others) back into the
        // object it gets, so a shared config would keep the first theme's colors after a switch
        mermaid.mermaidAPI.initialize(JSON.parse(JSON.stringify(config)));
        // Mermaid measures labels when it draws, so an icon font that is still
        // loading is measured as its ligature name ("folder"); wait for it first.
        const fontReady = value.includes("material-symbols")
            ? Promise.race([
                  document.fonts.load('28px "Material Symbols Outlined"', "folder"),
                  new Promise((resolve) => setTimeout(resolve, 3000)),
              ])
            : Promise.resolve();
        fontReady
            .then(() => mermaid.mermaidAPI.renderAsync(id, value))
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
            ref={containerRef}
            className={`${MermaidContainerClassName} ${styles.container}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

export default function Mermaid(props) {
    return <BrowserOnly>{() => <MermaidDiagram {...props} />}</BrowserOnly>;
}
