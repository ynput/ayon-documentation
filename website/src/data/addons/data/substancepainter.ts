import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Substance Painter",
    description:
        "Substance 3D Painter is a 3D painting software that allows users to texture and add materials directly to 3D meshes in real-time.",
    icon: "substance-painter-icon.png",
    badge: versions.SubstancePainter_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "colorManaged",
    ],
    products: ["workfile", "textureSet"],
    docs: {
        user: "https://help.ayon.app/articles/2948998-working-with-substance-painter",
        admin: "https://help.ayon.app/articles/6244730-substance-painter-addon-settings",
    },
    github: "https://github.com/ynput/ayon-substance-painter",
    discussion: "https://community.ynput.io/tag/substance-painter",
};

export default addon;
