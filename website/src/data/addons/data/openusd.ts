import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Open USD",
    description:
        "USD is a high-performance extensible software platform for collaboratively constructing animated 3D scenes, designed to meet the needs of large-scale film and visual effects production.",
    icon: "openusd.png",
    badge: versions.USD_Badge,
    features: [
    ],
    products: [
        "usd",
        "usdRender",
    ],
    docs: {
        user: "category/usd",
        admin: "addon_usd_admin",
    },
    github: "https://github.com/ynput/ayon-usd",
};

export default addon;
