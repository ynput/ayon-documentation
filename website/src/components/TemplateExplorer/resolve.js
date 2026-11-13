"use strict";
/**
 * Small template resolver for the AYON template syntax. Plain CommonJS so that node can run it
 * (see resolve.test.js) and webpack can import it.
 *
 * Supported: {key}, {nested[key]}, case variants ({Key}, {KEY}) when enabled, optional parts
 * <...> (nested allowed), inner links {@name} (expanded first, like the anatomy does when it
 * loads) and the format spec {key:0>3}.
 */

const LINK = /\{@([A-Za-z0-9_]+)\}/g;

function isEmpty(value) {
    return value === undefined || value === null || value === "";
}

function capitalize(value) {
    const text = String(value);
    return text.charAt(0).toUpperCase() + text.slice(1);
}

const TRANSFORMS = {
    copy: (value) => value,
    lower: (value) => String(value).toLowerCase(),
    upper: (value) => String(value).toUpperCase(),
    capitalize,
    pad: (value, rule) => String(value).padStart(rule.width || 0, rule.fill || "0"),
    basename: (value) => String(value).split("/").filter(Boolean).pop() || "",
    hierarchy: (value) => String(value).split("/").filter(Boolean).slice(0, -1).join("/"),
};

/** Expands {@name} links: a text from `links`, or the value of a context key (the paddings). */
function expandLinks(template, links, ctx) {
    let out = template;
    for (let round = 0; round < 20; round += 1) {
        let changed = false;
        out = out.replace(LINK, (match, name) => {
            if (typeof links[name] === "string") {
                changed = true;
                return links[name];
            }
            const entry = ctx[name];
            if (entry && !isEmpty(entry.value)) {
                changed = true;
                return String(entry.value);
            }
            return match;
        });
        if (!changed) {
            return out;
        }
    }
    throw new Error("Inner links do not resolve (cycle?) in: " + template);
}

/** Template text to a tree of literal, key and optional nodes. */
function parse(text) {
    let i = 0;
    function sequence(closer) {
        const nodes = [];
        let literal = "";
        const flush = () => {
            if (literal) {
                nodes.push({ type: "literal", text: literal });
                literal = "";
            }
        };
        while (i < text.length) {
            const c = text[i];
            if (c === "{") {
                const end = text.indexOf("}", i);
                if (end < 0) {
                    throw new Error("Unclosed { in: " + text);
                }
                flush();
                const body = text.slice(i + 1, end);
                const colon = body.indexOf(":");
                nodes.push({
                    type: "key",
                    name: colon < 0 ? body : body.slice(0, colon),
                    spec: colon < 0 ? "" : body.slice(colon + 1),
                });
                i = end + 1;
            } else if (c === "<") {
                i += 1;
                flush();
                nodes.push({ type: "optional", children: sequence(">") });
            } else if (closer && c === closer) {
                i += 1;
                flush();
                return nodes;
            } else {
                literal += c;
                i += 1;
            }
        }
        if (closer) {
            throw new Error("Unclosed < in: " + text);
        }
        flush();
        return nodes;
    }
    return sequence(null);
}

/** Format spec of a key: [[fill]align]width, for example 0>3 or 04. */
function formatValue(value, spec) {
    if (!spec) {
        return String(value);
    }
    const match = /^(?:(.)?([<>^]))?(\d+)?$/.exec(spec);
    if (!match) {
        throw new Error("Unsupported format spec: " + spec);
    }
    let [, fill, align, width] = match;
    const text = String(value);
    if (!width) {
        return text;
    }
    if (!align && width.charAt(0) === "0") {
        fill = "0";
        align = typeof value === "number" ? ">" : "<";
    }
    fill = fill || " ";
    align = align || (typeof value === "number" ? ">" : "<");
    const size = parseInt(width, 10);
    if (align === ">") {
        return text.padStart(size, fill);
    }
    if (align === "<") {
        return text.padEnd(size, fill);
    }
    const total = Math.max(0, size - text.length);
    const left = Math.floor(total / 2);
    return fill.repeat(left) + text + fill.repeat(total - left);
}

/** Context entry of a key; with caseVariants also {Key} and {KEY}. */
function lookup(name, ctx, caseVariants) {
    if (ctx[name]) {
        return ctx[name];
    }
    if (!caseVariants) {
        return undefined;
    }
    for (const base of Object.keys(ctx)) {
        const entry = ctx[base];
        if (name === base.toUpperCase()) {
            return { ...entry, value: String(entry.value).toUpperCase() };
        }
        if (name === capitalize(base)) {
            return { ...entry, value: capitalize(entry.value) };
        }
    }
    return undefined;
}

function evaluate(nodes, ctx, caseVariants) {
    const segments = [];
    const missing = [];
    nodes.forEach((node) => {
        if (node.type === "literal") {
            segments.push({ text: node.text });
        } else if (node.type === "key") {
            const entry = lookup(node.name, ctx, caseVariants);
            if (!entry || isEmpty(entry.value)) {
                missing.push(node.name);
                segments.push({ text: "{" + node.name + "}", missing: true, key: node.name });
            } else {
                segments.push({ text: formatValue(entry.value, node.spec), source: entry.source, key: node.name });
            }
        } else {
            const inner = evaluate(node.children, ctx, caseVariants);
            if (!inner.missing.length) {
                segments.push(...inner.segments);
            }
        }
    });
    return { segments, missing };
}

/** Resolves one template string. Returns { segments, text, missing }. */
function resolveTemplate(template, ctx, links, caseVariants) {
    const expanded = expandLinks(template, links || {}, ctx);
    const { segments, missing } = evaluate(parse(expanded), ctx, !!caseVariants);
    return { segments, missing, text: segments.map((s) => s.text).join("") };
}

/** Values of the inputs, by id, from the defaults of the data. */
function defaultValues(data) {
    const values = {};
    data.inputs.forEach((input) => {
        values[input.id] = input.default;
    });
    return values;
}

/** Context keys from the inputs and from the derived rules that do not need a template. */
function buildContext(data, values) {
    const ctx = {};
    data.inputs.forEach((input) => {
        if (!input.key) {
            return;
        }
        let value = values[input.id];
        if (value === undefined || value === null) {
            value = input.default;
        }
        if (input.kind === "number") {
            value = value === "" || Number.isNaN(Number(value)) ? "" : Number(value);
        } else {
            value = String(value);
        }
        ctx[input.key] = { value, source: input.id };
    });
    (data.derived || []).forEach((rule) => {
        if (rule.transform === "selected") {
            return;
        }
        // `from` is an input id, or an earlier context key
        const input = data.inputs.find((i) => i.id === rule.from);
        const from = ctx[input && input.key ? input.key : rule.from];
        const value = !from || isEmpty(from.value) ? "" : TRANSFORMS[rule.transform](from.value, rule);
        ctx[rule.key] = { value, source: from ? from.source : undefined };
    });
    return ctx;
}

/** A profile applies when every filter lists the current value. */
function matches(when, ctx) {
    return Object.keys(when || {}).every((key) => {
        const entry = ctx[key];
        return entry && when[key].includes(entry.value);
    });
}

/**
 * Resolves every template of the data for the input values.
 * Returns { ctx, rows }, rows in the order of data.templates with
 * { template, segments, text, missing, selected }.
 * The "selected" derived rules take the result of the best matching template of a group (most
 * filters, earlier wins a tie, fallback templates never win) as a context key.
 */
function resolveAll(data, values) {
    const ctx = buildContext(data, values);
    const links = data.links || {};
    const groupOf = (id) => (data.groups || []).find((g) => g.id === id) || {};
    const results = {};
    const selected = {};

    const run = (template) => {
        const result = resolveTemplate(template.template, ctx, links, groupOf(template.group).caseVariants);
        results[template.id] = result;
        return result;
    };

    (data.derived || [])
        .filter((rule) => rule.transform === "selected")
        .forEach((rule) => {
            let best = null;
            let bestScore = -1;
            data.templates
                .filter((t) => t.group === rule.group && t.template)
                .forEach((t) => {
                    run(t);
                    const score = Object.keys(t.when || {}).length;
                    if (!t.fallback && matches(t.when, ctx) && score > bestScore) {
                        best = t;
                        bestScore = score;
                    }
                });
            if (!best) {
                best = data.templates.find((t) => t.group === rule.group && t.fallback);
            }
            selected[best.id] = true;
            const winner = results[best.id];
            ctx[rule.key] = { value: winner.missing.length ? "" : winner.text, source: rule.id };
        });

    data.templates.filter((t) => t.template && !results[t.id]).forEach(run);
    data.templates
        .filter((t) => t.join)
        .forEach((t) => {
            const parts = t.join.map((id) => results[id]);
            const segments = [];
            parts.forEach((part, index) => {
                if (index) {
                    segments.push({ text: "/" });
                }
                segments.push(...part.segments);
            });
            results[t.id] = {
                segments,
                missing: [].concat(...parts.map((p) => p.missing)),
                text: segments.map((s) => s.text).join(""),
            };
        });

    const rows = data.templates.map((t) => ({
        ...t,
        template: t.template || t.join.map((id) => data.templates.find((x) => x.id === id).template).join("/"),
        ...results[t.id],
        selected: !!selected[t.id],
    }));
    return { ctx, rows };
}

/** Sources that get a highlight color: inputs with a key, then selected-name rules. */
function sourceList(data) {
    return [
        ...data.inputs.filter((i) => i.key).map((i) => ({ id: i.id, label: i.label })),
        ...(data.derived || []).filter((r) => r.transform === "selected").map((r) => ({ id: r.id, label: r.label })),
    ];
}

module.exports = { resolveTemplate, resolveAll, defaultValues, buildContext, sourceList, formatValue, expandLinks, TRANSFORMS };
