import { type Addon } from "../types";

const addon: Addon = {
    title: "Maya",
    description: "Robust Maya implementation that can handle full CG workflow",
    descriptionLong:
        "OpenPype includes very robust Maya implementation that can handle full CG workflow from model, through animation till final renders. Scene settings, Your artists won't need to touch file browser at all and OpenPype will take care of all the file management. Most of maya workflows are supported including gpucaches, referencing, nested references and render proxies.",
    icon: "maya-icon.png",
    features: [
        "sceneBuilder",
        "workfiles",
        "reviewables",
        "colorManaged",
        "farmRendering",
        "libraryLoader",
        "loader",
        "publisher",
        "sceneManager"
    ],
    families: [
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
        user: "artist_hosts_maya",
        admin: "admin_hosts_maya",
    },

    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/maya",
};

export default addon;
