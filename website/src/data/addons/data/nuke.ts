import { type Addon } from "../types";

const addon: Addon = {
    title: "Nuke",
    description:
        "Nuke is a compositing software for visual effects and motion graphics artists.",
    preview: "nuke.png",
    features: [
        "rendering",
        "workfiles",
        "loader",
        "scriptBuilding",
        "colorManaged",
        "reviewables",
        "publisher",
    ],
    families: ["nukeNodes", "camera", "gizmo", "source", "render", "write"],
    docs: {
        user: "artist_hosts_nuke",
        admin: "admin_hosts_nuke",
    },
    github: "https://github.com/ynput/ayon-addons/tree/main/nuke/dev",
};

export default addon;
