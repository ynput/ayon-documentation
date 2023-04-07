import { type Addon } from "../types";

const addon: Addon = {
    title: "Fusion",
    description:
        "Fusion is a visual effects and motion graphics tool that helps you create high-quality effects.",
    docs: {
        user: "artist_hosts_resolve",
        admin: "admin_hosts_resolve",
    },
    families: ["image", "review", "render", "plate", "model", "pointcache"],
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "slates",
        "colorManaged",
        "localRendering",
        "farmRendering",
        "nodePresets",
    ],
    icon: "fusion-icon.png",
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/fusion",
};

export default addon;
