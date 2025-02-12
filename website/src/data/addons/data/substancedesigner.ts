import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Substance Designer",
    description:
        "Adobe Substance 3D Designer is the industry's reference 3D Material Creation application.",
    icon: "substance-designer-icon.png",
    badge: versions.SubstanceDesigner_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader"
    ],
    products: ["workfile", "textureSet", "sbsar"],
    docs: {
        user: "addon_substancedesigner_artist",
        admin: "addon_substancedesigner_admin",
    },
    github: "https://github.com/ynput/ayon-substance-designer",
};

export default addon;
