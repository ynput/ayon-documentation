# TemplateExplorer

Resolves AYON templates (product names, work and publish paths) live for inputs the reader changes. Every part of a
result is colored after the input it came from. Templates that need a key without a value show `{key}` as missing;
optional parts `<...>` with a missing key are dropped.

```mdx
import naming from "@site/src/data/templates/naming.json";

<TemplateExplorer data={naming} />
```

Registered in `src/theme/MDXComponents/index.js`; data in `src/data/templates/<name>.json`. The first render uses the
default inputs, so the page HTML holds a real table of templates with their default results (crawlers and readers
without JavaScript); React state updates it in the browser.

Files: `index.js` (UI), `resolve.js` (formatter, plain CommonJS), `resolve.test.js` (run
`node src/components/TemplateExplorer/resolve.test.js`: checks the worked examples of `docs/pipeline/naming-conventions.md`).

## Template syntax

| Syntax | Behavior |
|---|---|
| `{key}`, `{nested[key]}` | Value of the context key. |
| `{Key}`, `{KEY}` | Capitalized first letter / all upper-case, only in groups with `caseVariants: true`. |
| `<...>` | Optional part, printed only if every key inside has a value. Can be nested. |
| `{@name}` | Inner link, expanded first from `links` (text) or from the context key `name` (a number such as a padding). |
| `{key:0>3}` | Format spec `[[fill]align]width` (`<`, `>`, `^`; `04` pads numbers with zeros). Dates are not implemented. |

## Data format

```json
{
  "inputGroups": [{ "id": "context", "label": "Folder, task and host" }],
  "inputs": [
    { "id": "task_name", "group": "context", "label": "Task name", "kind": "text", "key": "task[name]", "default": "lighting" },
    { "id": "host", "group": "context", "label": "Host", "kind": "select", "key": "host[name]", "default": "maya", "options": ["maya", "nuke"] },
    { "id": "version", "group": "files", "label": "Version", "kind": "number", "min": 0, "key": "version", "default": 3 }
  ],
  "derived": [
    { "key": "folder[name]", "from": "folder_path", "transform": "basename" },
    { "id": "product_name", "label": "Selected product name", "key": "product[name]", "transform": "selected", "group": "product" }
  ],
  "links": { "version": "v{version:0>{@version_padding}}" },
  "groups": [{ "id": "product", "label": "Product name templates", "caseVariants": true }],
  "templates": [
    { "id": "name_render", "group": "product", "label": "Base type render", "template": "{product[type]}{Task[name]}{Variant}<_{Aov}>",
      "description": "Shown in the Notes column.", "when": { "product[basetype]": ["render"] } },
    { "id": "full_work", "group": "full", "label": "Work default", "join": ["work_default_dir", "work_default_file"], "description": "..." }
  ]
}
```

- **inputs**: `kind` is `text`, `number` or `select` (`options`). `key` is the context key the input fills (an input
  without `key` is not used by templates). An empty value counts as missing. Inputs with a key get a highlight color
  in the order of the list (10 colors, then they repeat).
- **derived**: `key` is the context key produced, `from` an input id or an earlier context key. `transform` is
  `copy`, `lower`, `upper`, `capitalize` (first letter), `pad` (`width`, `fill`), `basename` and `hierarchy` (path
  helpers). The result has the color of the source input. `transform: "selected"` is special: its value is the
  result of the best matching template of `group` (the most `when` filters match, an earlier template wins a tie,
  templates with `fallback: true` never win); it needs `id` and `label` and gets its own color.
- **templates**: `when` maps context keys to the allowed values (all must match; used only by `selected` groups);
  `join` lists template ids whose results are joined with `/` (no `template` needed).
- Missing keys: the part is shown as `{key}` (red, dashed) and the row lists the keys.
