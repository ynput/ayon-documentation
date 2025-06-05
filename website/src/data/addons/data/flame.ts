import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Flame",
    description:
        "Flame Autodesk is a high-end visual effects and finishing software used by professional studios for film, television, and commercials.",
    icon: "flame-icon.png",
    badge: versions.Flame_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "libraryLoader",
        "reviewables",
        "colorManaged",
    ],
    products: [
        "render",
        "plate",
        "review",
        "image",
        "audio",
    ],
    docs: {
        user:"https://help.ayon.app/articles/5381712-working-with-autodesk-flame-in-ayon",
        admin: "https://help.ayon.app/articles/3647766-setup-autodesk-flame-addon",
    },
    github: "https://github.com/ynput/ayon-flame",
    discussion: "https://community.ynput.io/tag/flame",
};

export default addon;
