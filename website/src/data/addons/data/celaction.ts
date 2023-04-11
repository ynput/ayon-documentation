import { type Addon } from "../types";

const addon: Addon = {
    title: "CelAction",
    description:
        "CelAction2D is a 2D animation software that helps studios create high-quality, high-volume productions by using vectors and/or bitmaps.",
    icon: "celaction-icon.png",
    features: [
        "publisher",
        "farmRendering",
        "workfiles", 
        "reviewables",
    ],
    families: ["workfile", "render", "review", "audio"],
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/celaction",
};

export default addon;
