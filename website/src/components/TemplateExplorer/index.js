import React, { useMemo, useState } from "react";
import styles from "./styles.module.css";
import resolver from "./resolve";

const { resolveAll, defaultValues, sourceList } = resolver;
const COLORS = 10;

/**
 * Resolves the templates of `data` (see README.md) for inputs the reader changes.
 * The first render uses the default inputs, so the page HTML already holds the table of
 * templates and their default results; React state updates it live in the browser.
 */
export default function TemplateExplorer({ data }) {
    const [values, setValues] = useState(() => defaultValues(data));
    const { rows } = useMemo(() => resolveAll(data, values), [data, values]);

    const sources = useMemo(() => sourceList(data), [data]);
    const colorOf = (id) => {
        const index = sources.findIndex((s) => s.id === id);
        return index < 0 ? null : index % COLORS;
    };
    const labelOf = (id) => (sources.find((s) => s.id === id) || {}).label || id;
    const set = (id, value) => setValues((old) => ({ ...old, [id]: value }));
    const changed = data.inputs.some((i) => String(values[i.id]) !== String(i.default));

    const renderSegment = (seg, index) => {
        if (seg.missing) {
            return (
                <span key={index} className={styles.missing} title={"No value for " + seg.key}>
                    {seg.text}
                </span>
            );
        }
        const color = seg.source ? colorOf(seg.source) : null;
        if (color === null) {
            return <React.Fragment key={index}>{seg.text}</React.Fragment>;
        }
        return (
            <mark key={index} className={styles["c" + color]} title={seg.key + " from " + labelOf(seg.source)}>
                {seg.text}
            </mark>
        );
    };

    const renderInput = (input) => {
        const color = colorOf(input.id);
        const common = {
            value: values[input.id],
            onChange: (event) => set(input.id, event.target.value),
        };
        let control;
        if (input.kind === "select") {
            control = (
                <select {...common}>
                    {input.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        } else if (input.kind === "number") {
            control = <input type="number" min={input.min} step="1" {...common} />;
        } else {
            control = <input type="text" spellCheck={false} {...common} />;
        }
        return (
            <label key={input.id} className={styles.field}>
                <span className={styles.fieldLabel}>
                    {color !== null && <span className={styles["s" + color]} aria-hidden="true" />}
                    {input.label}
                </span>
                {control}
            </label>
        );
    };

    const productColor = colorOf("product_name");

    return (
        <div className={styles.explorer}>
            <div className={styles.inputs}>
                {data.inputGroups.map((group) => (
                    <fieldset key={group.id} className={styles.group}>
                        <legend>{group.label}</legend>
                        {data.inputs.filter((i) => i.group === group.id).map(renderInput)}
                    </fieldset>
                ))}
            </div>
            <div className={styles.bar}>
                <span>
                    Every part of a result is colored like the input it came from.
                    {productColor !== null && (
                        <>
                            {" "}
                            <mark className={styles["c" + productColor]}>Product name</mark> is the result of the selected
                            product name template.
                        </>
                    )}
                </span>
                <button type="button" className={styles.reset} disabled={!changed} onClick={() => setValues(defaultValues(data))}>
                    Reset inputs
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Template</th>
                        <th>Result</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                {data.groups.map((group) => (
                    <tbody key={group.id}>
                        <tr className={styles.groupRow}>
                            <th colSpan={3} scope="colgroup">
                                {group.label}
                            </th>
                        </tr>
                        {rows
                            .filter((row) => row.group === group.id)
                            .map((row) => (
                                <tr key={row.id} className={row.selected ? styles.selected : undefined}>
                                    <td>
                                        <div>{row.label}</div>
                                        <code className={styles.template}>{row.template}</code>
                                    </td>
                                    <td>
                                        <code className={styles.result}>{row.segments.map(renderSegment)}</code>
                                    </td>
                                    <td className={styles.notes}>
                                        {row.selected && <strong>Selected by the current base type and host. </strong>}
                                        {row.description}
                                        {row.missing.length > 0 && (
                                            <div className={styles.missingNote}>
                                                No value for: {[...new Set(row.missing)].join(", ")}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                ))}
            </table>
        </div>
    );
}
