# FlowTrace

An interactive trace of a sequence of steps across lanes: for example how a piece of data changes
while it passes through plugins, or what exists where after each stage. A reader picks a scenario,
clicks a step and sees its details and the keys it touches.

```mdx
import trace from "@site/src/data/flows/publishing-stages.json";

<FlowTrace data={trace} />
```

`FlowTrace` is registered in `src/theme/MDXComponents/index.js`. The data lives in `src/data/flows/<name>.json`.
The component also renders every scenario as plain tables inside a `<details>` element, so the
information is in the page HTML for crawlers and for readers without JavaScript. Write the data so
that those tables read well on their own.

## Data format

```json
{
  "lanes": [{ "id": "a", "label": "Instance data" }, { "id": "b", "label": "Representation data" }],
  "statuses": { "ok": "as expected", "gap": "limitation" },
  "nowLabel": "Now",
  "expectedLabel": "Expected",
  "keysLabel": "Keys",
  "variants": [{ "id": "old", "label": "Version 1" }, { "id": "new", "label": "Version 2" }],
  "keys": [
    { "id": "cs", "name": "colorspace", "group": "instance", "groupColor": "a", "text": "What the key holds.",
      "variants": { "new": "Text of the key in the variant." } }
  ],
  "scenarios": [
    {
      "id": "farm",
      "label": "Render on farm",
      "steps": [
        { "phase": "Collect" },
        { "lane": 0, "title": "PluginName", "subtitle": "order +0.15", "status": "ok",
          "now": "What it does.", "expected": "What it should do.", "note": "Optional note.",
          "keys": ["cs"],
          "variants": { "new": { "now": "Overrides for the variant", "status": "ok" } } }
      ]
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `lanes` | One to three columns. A step sits in the lane given by its `lane` index (default 0). |
| `statuses` | Labels for the status colors: `ok` (mint), `warn` (yellow), `gap` (red), `pass` (grey), `info` (blue, the default). Defaults exist for all five; override the wording only. |
| `variants` | Optional switch that applies overrides: a step or key with a `variants` object replaces its fields when that variant is selected. The last variant is selected first. |
| `keys` | Optional glossary shown beside the chart. `groupColor` is `a` (blue), `b` (mint), `c` (yellow) or `d` (red). Keys listed in a step's `keys` are highlighted when the step is selected; keys used by no step of the scenario are dimmed. |
| `scenarios[].steps` | Either `{ "phase": "text" }` (a dashed divider) or a step: `title`, `subtitle`, `status`, `now`, `expected`, `note`, `keys`, `lane`, `variants`. |

Keep titles short (they sit in a 205 to 360 pixel box), and put the explanation in `now` and `expected`.
