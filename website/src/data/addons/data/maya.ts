import { type Addon } from "../types";

const addon: Addon = {
    title: "Maya",
    description: "Robust Maya implementation that can handle full CG workflow",
    descriptionLong:
        "OpenPype includes very robust Maya implementation that can handle full CG workflow from model, through animation till final renders. Scene settings, Your artists won't need to touch file browser at all and OpenPype will take care of all the file management. Most of maya workflows are supported including gpucaches, referencing, nested references and render proxies.",
    icon: "maya-icon.png",
    features: ["sceneBuilder", "rendering", "workfiles", "reviewables"],
    families: [
        "model",
        "look",
        "rig",
        "setdress",
        "animation",
        "cache",
        "VDBCache",
        "assembly",
        "camera",
        "rig",
        "renderSetup",
        "plate",
        "arnoldStandin",
        "yetiCache",
        "yetiRig",
        "vrayScene",
        "vrayProxy",
        "pointcache",
    ],
    docs: {
        user: "artist_hosts_maya",
        admin: "admin_hosts_maya",
    },

    github: "https://github.com/ynput/ayon-addons/tree/main/maya/dev",
};

export default addon;
