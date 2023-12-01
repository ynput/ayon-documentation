import { type Addon } from "../types";

const addon: Addon = {
    title: "Substance Painter",
    description:
        "Substance 3D Painter is a 3D painting software that allows users to texture and add materials directly to 3D meshes in real-time.",
    icon: "substance-painter-icon.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "colorManaged",
    ],
    products: [
        "workfile",
        "textureSet",
    ],
    docs: {
        user: "addon_substancepainter_artist",
        admin: "addon_substancepainter_admin",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/substancepainter",
};

export default addon;
