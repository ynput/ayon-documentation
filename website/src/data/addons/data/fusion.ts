import { type Addon } from "../types";

const addon: Addon = {
    title: "Fusion",
    description:
        "Fusion is a visual effects and motion graphics tool that helps you create high-quality effects.",
    docs: {
        user: "artist_hosts_resolve",
        admin: "admin_hosts_resolve",
    },
    families: ["plate", "review"],
    features: ["workfiles", "rendering", "reviewables"],
    icon: "fusion-icon.png",
    github: "https://github.com/ynput/ayon-addons/tree/main/fusion/dev",
};

export default addon;
