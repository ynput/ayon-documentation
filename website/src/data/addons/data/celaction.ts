import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "CelAction",
    description:
        "CelAction2D is a 2D animation software that helps studios create high-quality, high-volume productions by using vectors and/or bitmaps.",
    icon: "celaction-icon.png",
    badge: versions.Celaction_Badge,
    features: ["publisher", "farmRendering", "workfiles", "reviewables"],
    products: ["workfile", "render", "review", "audio"],
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/celaction",
};

export default addon;
