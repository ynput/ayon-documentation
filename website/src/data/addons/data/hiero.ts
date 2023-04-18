import { type Addon } from "../types";

const addon: Addon = {
    title: "Hiero",
    description:
        "Hiero and NukeStudio is a versatile VFX tool for artists and teams. It helps you review, edit, and conform shots.",
    preview: "hiero.png",
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "colorManaged"
    ],
    families: [
        "audio",
        "plate",
        "review",
        "frame",
        "effect",
        "workfile",
    ],
    docs: {
        user: "artist_hosts_hiero",
        admin: "admin_hosts_hiero",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/hiero",
};

export default addon;
