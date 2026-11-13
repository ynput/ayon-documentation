/**
 * Swatches and type samples of the AYON web app theme, for the frontend theme page:
 *
 *   <Swatches colors={[{ name: "--md-sys-color-primary", hex: "#8FCEFF", note: "Save buttons" }]} />
 *   <TypeScale styles={[{ name: "titleSmall", size: 14, lineHeight: 20, weight: 600 }]} />
 *
 * - `Swatches`: one card per color, with the color, the CSS variable, the hex value and an
 *   optional note. `source` shows the original value when it is not hex, for example an hsl().
 * - `TypeScale`: one row per typography class, rendered in Nunito Sans (the font of the web app,
 *   installed with @fontsource-variable/nunito-sans) at its size, line height and weight.
 */
import React from "react";
import styles from "./styles.module.css";

export function Swatches({ colors = [] }) {
    return (
        <div className={styles.swatches}>
            {colors.map((c) => (
                <div key={c.name} className={styles.swatch}>
                    <div className={styles.color} style={{ background: c.hex }} />
                    <code className={styles.name}>{c.name}</code>
                    <span className={styles.value}>
                        {c.hex}
                        {c.source && <span className={styles.source}> ({c.source})</span>}
                    </span>
                    {c.note && <span className={styles.note}>{c.note}</span>}
                </div>
            ))}
        </div>
    );
}

export function TypeScale({ styles: rows = [], sample = "The quick brown fox jumps over the lazy dog" }) {
    return (
        <div className={styles.typeScale}>
            {rows.map((r) => (
                <div key={r.name} className={styles.typeRow}>
                    <div className={styles.typeMeta}>
                        <code>{r.name}</code>
                        <span>
                            {r.size}px / {r.lineHeight}px, {r.weight}
                        </span>
                    </div>
                    <div
                        className={styles.typeSample}
                        style={{ fontSize: `${r.size}px`, lineHeight: `${r.lineHeight}px`, fontWeight: r.weight }}>
                        {sample}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Swatches;
