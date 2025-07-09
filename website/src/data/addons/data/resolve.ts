import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "DaVinci Resolve",
    description:
        "DaVinci Resolve is a professional non-linear editing and color grading software with a free version for basic editing and color correction.",
    icon: "resolve-icon.png",
    badge: versions.Resolve_Badge,
    docs: {
        user: "https://help.ayon.app/articles/9472845-working-with-resolve-studio-in-ayon",
        admin: "https://help.ayon.app/articles/3786946-configure-resolve-studio-to-work-with-ayon",
    },
    github: "https://github.com/ynput/ayon-resolve",
    discussion: "https://community.ynput.io/tag/resolve",
};

export default addon;
