import { type Addon } from "../types";

const addon: Addon = {
    title: "TVPaint",
    description:
        "TVPaint Animation is a 2D animation software that allows users to create and edit animations with a variety of tools and features. ",
    icon: "tvpaint-icon.png",
    features: ["localRendering", "workfiles", "reviewables"],
    products: ["image", "audio"],
    docs: {
        user: "artist_hosts_tvpaint",
        admin: "admin_hosts_tvpaint",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/tvpaint",
};

export default addon;
