import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Perforce",
    description:
        "The AYON Perforce addon connects AYON managed Unreal projects with perforce.",
    icon: "perforce-icon.png",
    badge: versions.Perforce_Badge,
    features: [
    ],
    products: [
    ],
    docs: {
        // user: "",
        admin: "https://help.ayon.app/articles/1233046-about-perforce-and-ayon",
    },
    github: "https://github.com/ynput/ayon-perforce",
    discussion: "https://community.ynput.io/tag/perforce",
};

export default addon;
