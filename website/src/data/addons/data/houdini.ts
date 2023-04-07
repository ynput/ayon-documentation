import { type Addon } from "../types";

const addon: Addon = {
    title: "Houdini",
    description:
        "Houdini is a 3D animation software tool set used for creating visual effects in film and television.",
    icon: "houdini-icon.png",
    features: ["workfiles"],
    families: ["model", "pointcache", "VDBCache", "camera"],
    docs: {
        user: "artist_hosts_houdini",
        admin: "admin_hosts_houdini",
    },
    github: "https://github.com/ynput/ayon-addons/tree/main/houdini/dev",
};

export default addon;
