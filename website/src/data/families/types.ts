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
    | "assembly"
    | "layout"
    | "setdress"
    | "camera"
    | "animation"
    | "cache"
    | "mayaAscii"
    | "render"
    | "prerender"
    | "renderSetup"
    | "plate"
    | "write"
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
    | "gizmo"
    | "harmonyTemplate"
    | "harmonyPalette"
    | "audio"
    | "background"
    | "action"
    | "pointcache"
    | "source";
