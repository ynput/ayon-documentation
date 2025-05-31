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
        user: "https://help.ayon.app/articles/3607676-working-with-premiere-in-ayon",
        admin: "https://help.ayon.app/articles/1663762-premiere-addon-settings",
    },
    github: "https://github.com/ynput/ayon-premiere",
    discussion: "https://community.ynput.io/tag/premiere",
};

export default addon;
