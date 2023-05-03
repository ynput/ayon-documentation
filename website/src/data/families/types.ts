export type Family = {
    title: string;
    icon: string;
    docs?: string;
};

export type Families = Family[];

export type FamilyType =
    | "model"
    | "look"
    | "rig"
    | "layout"
    | "setdress"
    | "camera"
    | "animation"
    | "cache"
    | "render"
    | "prerender"
    | "renderSetup"
    | "plate"
    | "frame"
    | "image"
    | "layeredImage"
    | "review"
    | "texture"
    | "matchmove"
    | "workfile"
    | "nukeNodes"
    | "yetiCache"
    | "yetiRig"
    | "VDBCache"
    | "vrayProxy"
    | "vrayScene"
    | "arnoldStandin"
    | "lut"
    | "effect"
    | "gizmo"
    | "harmonyTemplate"
    | "harmonyPalette"
    | "audio"
    | "background"
    | "pointcache"
    | "maxScene"
    | "mayaScene"
    | "pointCloud";
