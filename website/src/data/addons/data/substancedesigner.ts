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
        user: "https://help.ayon.app/articles/8280887-working-with-substance-designer-in-ayon",
        admin: "https://help.ayon.app/articles/4514163-configure-substance-designer-addon",
    },
    github: "https://github.com/ynput/ayon-substance-designer",
    discussion: "https://community.ynput.io/tag/substance-designer",
};

export default addon;
