import { type Addon } from "../types";

const addon: Addon = {
    title: "TVPaint",
    description:
        "TVPaint Animation is a 2D animation software that allows users to create and edit animations with a variety of tools and features. ",
    icon: "tvpaint-icon.png",
    features: ["rendering", "workfiles", "reviewables"],
    families: ["image", "audio"],
    docs: {
        user: "artist_hosts_tvpaint",
        admin: "admin_hosts_tvpaint",
    },
    github: "https://github.com/ynput/ayon-addons/tree/main/tvpaint/dev",
};

export default addon;
