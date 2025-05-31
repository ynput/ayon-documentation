import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "TVPaint",
    description:
        "TVPaint Animation is a 2D animation software that allows users to create and edit animations with a variety of tools and features. ",
    icon: "tvpaint-icon.png",
    badge: versions.TVPaint_Badge,
    features: ["localRendering", "workfiles", "reviewables"],
    products: ["image", "audio"],
    docs: {
        user: "https://help.ayon.app/articles/8337707-working-with-tvpaint-in-ayon",
        admin: "https://help.ayon.app/articles/8770967-tvpaint-addon-settings",
    },
    github: "https://github.com/ynput/ayon-tvpaint",
    discussion: "https://community.ynput.io/tag/tv-paint",
};

export default addon;
