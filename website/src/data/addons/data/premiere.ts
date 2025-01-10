import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Premiere",
    description:
        "Adobe Premiere Pro is a professional video editing software widely used in the film, television, and online content industries.",
    icon: "premiere-icon.png",
    badge: versions.Premiere_Badge,
    features: ["workfiles"],
    products: [],
    docs: {
        user: "addon_premiere_artist",
        admin: "addon_premiere_admin",
    },
    github: "https://github.com/ynput/ayon-premiere",
};

export default addon;
