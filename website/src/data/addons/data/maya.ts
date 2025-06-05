import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Maya",
    description: "Robust Maya implementation that can handle full CG workflow",
    descriptionLong: `
AYON includes very robust Maya implementation that can handle full CG workflow from model, 
through animation till final renders and scene settings. Your artists
won't need to touch file browser at all and AYON will take care of all the file management. 
Most of maya workflows are supported including gpucaches, automatic shader, nested references and render proxies.

We are recommend using \`2023\` and above.
         `,
    icon: "maya-icon.png",
    badge: versions.Maya_Badge,
    features: [
        "sceneBuilder",
        "workfiles",
        "reviewables",
        "colorManaged",
        "farmRendering",
        "libraryLoader",
        "loader",
        "slates",
        "publisher",
        "sceneManager",
    ],
    products: [
        "model",
        "look",
        "rig",
        "layout",
        "setdress",
        "camera",
        "animation",
        "render",
        "renderSetup",
        "plate",
        "image",
        "review",
        "texture",
        "matchmove",
        "workfile",
        "yetiCache",
        "yetiRig",
        "VDBCache",
        "vrayProxy",
        "vrayScene",
        "arnoldStandin",
        "audio",
        "pointcache",
        "mayaScene",
    ],
    docs: {
        user: "https://help.ayon.app/collections/8062296-maya",
        admin: "https://help.ayon.app/collections/8127361-maya-addon-settings",
    },

    github: "https://github.com/ynput/ayon-maya",
    discussion: "https://community.ynput.io/tag/maya",
};

export default addon;
