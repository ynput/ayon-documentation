"use strict";
// Run with: node src/components/TemplateExplorer/resolve.test.js
// Checks the resolver against the worked examples of docs/pipeline/naming-conventions.md.
const assert = require("assert");
const data = require("../../data/templates/naming.json");
const { resolveAll, resolveTemplate, defaultValues, formatValue, TRANSFORMS } = require("./resolve");

const run = (overrides) => {
    const { rows } = resolveAll(data, { ...defaultValues(data), ...overrides });
    const by = {};
    rows.forEach((r) => {
        by[r.id] = r;
    });
    return by;
};
const selectedName = (rows) => rows[Object.keys(rows).find((id) => rows[id].selected)].text;

// Formatter and transforms
assert.strictEqual(formatValue(3, "0>3"), "003");
assert.strictEqual(formatValue(1234, "0>3"), "1234");
assert.strictEqual(formatValue(7, "0>4"), "0007");
assert.strictEqual(formatValue("ab", ">4"), "  ab");
assert.strictEqual(TRANSFORMS.capitalize("bgAnim"), "BgAnim");
assert.strictEqual(TRANSFORMS.pad(7, { width: 4 }), "0007");
assert.strictEqual(TRANSFORMS.basename("/shots/sq01/sh010"), "sh010");
assert.strictEqual(TRANSFORMS.hierarchy("/shots/sq01/sh010"), "shots/sq01");

// Case variants and optional parts
const ctx = { "task[name]": { value: "bgAnim", source: "t" }, aov: { value: "", source: "a" } };
assert.strictEqual(resolveTemplate("{task[name]}|{Task[name]}|{TASK[NAME]}", ctx, {}, true).text, "bgAnim|BgAnim|BGANIM");
assert.strictEqual(resolveTemplate("x<_{aov}>y", ctx, {}, true).text, "xy");
assert.strictEqual(resolveTemplate("x<_{aov}>y{aov}", ctx, {}, true).missing[0], "aov");
assert.strictEqual(resolveTemplate("<a<b{task[name]}>{aov}>c", ctx, {}, true).text, "c");
assert.strictEqual(resolveTemplate("<a<b{task[name]}>>c", ctx, {}, true).text, "abbgAnimc");
assert.strictEqual(resolveTemplate("{Task[name]}", ctx, {}, false).missing.length, 1);

// Product names (context: folder sh010, task lighting)
let r = run({});
assert.strictEqual(selectedName(r), "modelMain");
assert.strictEqual(run({ variant: "High" }).name_default.text, "modelHigh");
r = run({ base_type: "workfile" });
assert.strictEqual(selectedName(r), "workfileLighting");
r = run({ base_type: "render", host: "nuke", aov: "beauty" });
assert.strictEqual(selectedName(r), "renderLightingMain_Beauty");
r = run({ base_type: "render", host: "nuke", aov: "" });
assert.strictEqual(selectedName(r), "renderLightingMain");
r = run({ base_type: "staticMesh", folder_path: "/assets/chair" });
assert.strictEqual(selectedName(r), "S_chairMain");
r = run({ base_type: "hda", host: "houdini", folder_path: "/assets/rock" });
assert.strictEqual(selectedName(r), "rock_Main");
r = run({ base_type: "camera", task_name: "" });
assert.strictEqual(selectedName(r), "cameraMain");
assert.strictEqual(run({}).name_fallback.text, "modelMain");
assert.strictEqual(run({ base_type: "workfile", host: "tvpaint" }).name_review_ae_tvpaint.selected, true);

// Work files
r = run({ version: 1 });
assert.strictEqual(r.work_default_dir.text, "C:/projects/my_project/shots/sq01/sh010/work/lighting");
assert.strictEqual(r.work_default_file.text, "mp_sh010_lighting_v001.ma");
r = run({ version: 12, comment: "fix" });
assert.strictEqual(r.full_work.text, "C:/projects/my_project/shots/sq01/sh010/work/lighting/mp_sh010_lighting_v012_fix.ma");
assert.strictEqual(run({ version: 0 }).work_default_file.text, "mp_sh010_lighting_v000.ma");
r = run({ ext: "uproject", host: "unreal" });
assert.strictEqual(r.work_unreal_dir.text + "/" + r.work_unreal_file.text, "C:/projects/my_project/unreal/lighting/mp_sh010.uproject");

// Publish paths
r = run({});
assert.strictEqual(r.full_publish.text, "C:/projects/my_project/shots/sq01/sh010/publish/model/modelMain/v003/mp_sh010_modelMain_v003.ma");
assert.strictEqual(r.full_hero.text, "C:/projects/my_project/shots/sq01/sh010/publish/model/modelMain/hero/mp_sh010_modelMain_hero.ma");
r = run({ base_type: "render", host: "nuke", variant: "Main", version: 1, ext: "exr", frame: 1001 });
assert.strictEqual(r.pub_render_file.text, "mp_sh010_renderLightingMain_v001.1001.exr");
assert.strictEqual(r.full_render.text, "C:/projects/my_project/shots/sq01/sh010/publish/render/renderLightingMain/v001/mp_sh010_renderLightingMain_v001.1001.exr");
assert.strictEqual(run({ base_type: "render", version: 1, ext: "mp4", output: "review" }).pub_render_file.text, "mp_sh010_renderLightingMain_v001_review.mp4");
assert.strictEqual(run({ base_type: "render", version: 1, ext: "exr", frame: 7 }).pub_render_file.text, "mp_sh010_renderLightingMain_v001.0007.exr");
assert.ok(run({ version_padding: 4 }).pub_default_dir.text.endsWith("/v0003"));
r = run({ base_type: "texture", variant: "Main", version: 2, udim: "1002", ext: "png" });
assert.strictEqual(r.pub_default_file.text, "mp_sh010_textureMain_v002_1002.png");
r = run({ base_type: "staticMesh", host: "maya", folder_path: "/assets/chair", version: 2, ext: "fbx" });
assert.strictEqual(r.pub_maya2unreal_dir.text + "/" + r.pub_maya2unreal_file.text, "C:/projects/my_project/assets/chair/publish/staticMesh/S_chairMain_v002.fbx");
r = run({ original_dirname: "my_project/in", original_basename: "plate01", ext: "exr" });
assert.strictEqual(r.pub_source_dir.text + "/" + r.pub_source_file.text, "C:/projects/my_project/in/plate01.exr");

// A missing key is reported
assert.deepStrictEqual(run({ base_type: "renderLayer", host: "tvpaint", renderlayer: "" }).name_tvpaint_layers.missing, ["Renderlayer"]);

console.log("resolve.test.js: all checks passed");
