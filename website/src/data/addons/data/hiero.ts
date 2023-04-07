import { type Addon } from "../types";

const addon: Addon = {
    title: "Hiero",
    description:
        "Hiero is a versatile VFX tool for artists and teams. It helps you review, edit, and conform shots.",
    preview: "hiero.png",
    features: ["rendering", "farmRendering", "workfiles"],
    families: [
        "render",
        "plate",
        "review",
        "lut",
        "nukeNodes",
        "gizmo",
        "workfile",
    ],
    docs: {
        user: "artist_hosts_hiero",
        admin: "admin_hosts_hiero",
    },
    github: "https://github.com/ynput/ayon-addons/tree/main/hiero/dev",
};

export default addon;
