import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";

/**
 * Interactive trace of a sequence of steps across lanes (for example, how a piece
 * of data changes while it passes through plugins). The data comes from a JSON file,
 * see README.md in this folder for the format.
 *
 *   import trace from "@site/src/data/flows/publishing-stages.json";
 *   <FlowTrace data={trace} />
 *
 * The chart is an enhancement: the same information is rendered as plain tables
 * inside <details> elements below it, so it is part of the page HTML (crawlers and
 * readers without JavaScript get it too).
 */

const DEFAULT_STATUSES = {
    ok: "matches spec",
    warn: "needs cleanup",
    gap: "wrong or missing",
    pass: "read or pass-through",
    info: "note",
};
const BOX_WIDTH = { 1: 360, 2: 300, 3: 205 };
const H = 46;
const P = 62;
const PH = 30;
const TOP = 40;
const WIDTH = 680;

function boxWidth(count) {
    return BOX_WIDTH[count] || 205;
}

function laneX(count, lane) {
    const w = boxWidth(count);
    if (count === 1) {
        return (WIDTH - w) / 2;
    }
    const gap = (WIDTH - 32 - w * count) / (count - 1);
    return 16 + lane * (w + gap);
}

function applyVariant(step, variant) {
    return variant && step.variants && step.variants[variant]
        ? { ...step, ...step.variants[variant] }
        : step;
}

function keyText(item, variant) {
    return variant && item.variants && item.variants[variant] ? item.variants[variant] : item.text;
}

export default function FlowTrace({ data }) {
    const statuses = { ...DEFAULT_STATUSES, ...(data.statuses || {}) };
    const lanes = data.lanes;
    const variants = data.variants || [];
    const [scenarioId, setScenarioId] = useState(data.scenarios[0].id);
    const [variant, setVariant] = useState(variants.length ? variants[variants.length - 1].id : null);
    const [selected, setSelected] = useState(null);

    const scenario = data.scenarios.find((s) => s.id === scenarioId);
    const steps = useMemo(
        () => scenario.steps.map((s) => (s.phase ? s : applyVariant(s, variant))),
        [scenario, variant]
    );
    const used = new Set();
    steps.forEach((s) => (s.keys || []).forEach((k) => used.add(k)));
    const current = selected !== null && steps[selected] && !steps[selected].phase ? steps[selected] : null;
    const highlighted = new Set(current ? current.keys || [] : []);

    const w = boxWidth(lanes.length);
    let y = TOP;
    let prev = null;
    const shapes = [];
    steps.forEach((s, i) => {
        if (s.phase) {
            shapes.push(
                <g key={`ph${i}`}>
                    <line x1="10" y1={y + 6} x2={WIDTH - 10} y2={y + 6} stroke="var(--md-sys-color-outline-variant)" strokeDasharray="3 3" />
                    <text x={WIDTH / 2} y={y + 20} textAnchor="middle" fontSize="12" fill="var(--md-sys-color-outline)">
                        {s.phase}
                    </text>
                </g>
            );
            y += PH;
            return;
        }
        const x = laneX(lanes.length, s.lane || 0);
        if (prev) {
            const px = prev.x + w / 2;
            const cx = x + w / 2;
            const py = prev.y + H;
            shapes.push(
                px === cx ? (
                    <line key={`l${i}`} x1={px} y1={py} x2={cx} y2={y - 3} stroke="var(--md-sys-color-outline)" markerEnd="url(#ft-arrow)" />
                ) : (
                    <path key={`l${i}`} d={`M${px} ${py} V${y - 10} H${cx} V${y - 3}`} fill="none" stroke="var(--md-sys-color-outline)" markerEnd="url(#ft-arrow)" />
                )
            );
        }
        const st = s.status || "info";
        shapes.push(
            <g
                key={`n${i}`}
                className={`${styles.node} ${selected === i ? styles.sel : ""}`}
                data-status={st}
                tabIndex={0}
                role="button"
                aria-label={`${s.title}, ${s.subtitle || ""}`}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(i);
                    }
                }}
            >
                <rect x={x} y={y} width={w} height={H} rx="7" className={styles.box} />
                <text x={x + w / 2} y={y + 17} textAnchor="middle" dominantBaseline="central" className={styles.title}>
                    {s.title}
                </text>
                <text x={x + w / 2} y={y + 33} textAnchor="middle" dominantBaseline="central" className={styles.subtitle}>
                    {s.subtitle}
                </text>
            </g>
        );
        prev = { x, y };
        y += P;
    });
    const height = y - P + H + 14;

    const dividers = [];
    for (let i = 1; i < lanes.length; i++) {
        const x = (laneX(lanes.length, i - 1) + w + laneX(lanes.length, i)) / 2;
        dividers.push(<line key={i} x1={x} y1="28" x2={x} y2={height - 4} stroke="var(--md-sys-color-outline-variant)" />);
    }

    return (
        <div className={styles.trace}>
            <div className={styles.controls}>
                {data.scenarios.length > 1 && (
                <div className={styles.seg} role="group" aria-label="Scenario">
                    {data.scenarios.map((s) => (
                        <button
                            key={s.id}
                            type="button"
                            aria-pressed={s.id === scenarioId}
                            onClick={() => {
                                setScenarioId(s.id);
                                setSelected(null);
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
                )}
                {variants.length > 0 && (
                    <div className={styles.seg} role="group" aria-label="Variant">
                        {variants.map((v) => (
                            <button key={v.id} type="button" aria-pressed={v.id === variant} onClick={() => setVariant(v.id)}>
                                {v.label}
                            </button>
                        ))}
                    </div>
                )}
                <div className={styles.legend}>
                    {Object.keys(statuses)
                        .filter((k) => steps.some((s) => s.status === k))
                        .map((k) => (
                            <span key={k} className={styles.chip} data-status={k}>
                                {statuses[k]}
                            </span>
                        ))}
                </div>
            </div>

            <div className={styles.layout}>
                <div className={styles.chart}>
                    <svg viewBox={`0 0 ${WIDTH} ${height}`} role="img" aria-label={`${scenario.label} flow`}>
                        <defs>
                            <marker id="ft-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </marker>
                        </defs>
                        {lanes.map((l, i) => (
                            <text key={l.id} x={laneX(lanes.length, i) + w / 2} y="20" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--md-sys-color-on-surface)">
                                {l.label}
                            </text>
                        ))}
                        {dividers}
                        {shapes}
                    </svg>
                </div>
                <aside className={styles.side}>
                    <div className={styles.detail}>
                        {current ? (
                            <>
                                <div>
                                    <code>{current.title}</code> {current.subtitle}{" "}
                                    <span className={styles.chip} data-status={current.status || "info"}>
                                        {statuses[current.status || "info"]}
                                    </span>
                                </div>
                                {current.now && (
                                    <div>
                                        <strong>{data.nowLabel || "Now"}:</strong> {current.now}
                                    </div>
                                )}
                                {current.expected && (
                                    <div>
                                        <strong>{data.expectedLabel || "Expected"}:</strong> {current.expected}
                                    </div>
                                )}
                                {current.note && <div>{current.note}</div>}
                            </>
                        ) : (
                            "Select a step in the chart to see its details."
                        )}
                    </div>
                    {data.keys && data.keys.length > 0 && (
                        <div className={styles.keysBox}>
                            <div className={styles.keysHead}>
                                <strong>{data.keysLabel || "Keys"}</strong> (dimmed: not used in this scenario)
                            </div>
                            <div className={styles.keys}>
                                {data.keys.map((k) => (
                                    <div
                                        key={k.id}
                                        className={`${styles.key} ${used.has(k.id) ? "" : styles.dim} ${highlighted.has(k.id) ? styles.hi : ""}`}
                                        data-group={k.groupColor || "a"}
                                    >
                                        <div>
                                            <code>{k.name}</code>
                                            {k.group && <span className={styles.group}>{k.group}</span>}
                                        </div>
                                        <div>{keyText(k, variant)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </div>

            <details className={styles.plain}>
                <summary>Plain-text version of the steps</summary>
                {data.scenarios.map((sc) =>
                    (variants.length ? variants : [{ id: null, label: "" }]).map((v) => (
                        <div key={`${sc.id}-${v.id}`}>
                            <p>
                                <strong>
                                    {sc.label}
                                    {v.label ? `, ${v.label}` : ""}
                                </strong>
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Step</th>
                                        <th>Where</th>
                                        <th>{data.nowLabel || "Now"}</th>
                                        <th>{data.expectedLabel || "Expected"}</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sc.steps
                                        .map((s) => (s.phase ? s : applyVariant(s, v.id)))
                                        .map((s, i) =>
                                            s.phase ? (
                                                <tr key={i}>
                                                    <td colSpan={5}>
                                                        <em>{s.phase}</em>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <tr key={i}>
                                                    <td>
                                                        <code>{s.title}</code> {s.subtitle}
                                                    </td>
                                                    <td>{lanes[s.lane || 0].label}</td>
                                                    <td>{s.now}</td>
                                                    <td>{s.expected}</td>
                                                    <td>{statuses[s.status || "info"]}</td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    ))
                )}
            </details>
        </div>
    );
}
