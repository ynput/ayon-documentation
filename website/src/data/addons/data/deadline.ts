import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Deadline",
    description:
        "Deadline is a vfx localRendering farm software that manages jobs and helps you get renders done faster.",
    preview: "deadline.png",
    badge: versions.Deadline_Badge,
    docs: {
        user: "https://help.ayon.app/articles/8138091-working-with-deadline-in-ayon",
        admin: "https://help.ayon.app/articles/5372986-configure-deadline-addon",
        developer: "dev_deadline",
    },
    features: [
        "publisher",
        "colorManaged",
        "farmRendering",
        "reviewables",
        "slates",
    ],
    products: ["render", "plate", "image", "review", "pointcache", "prerender"],
    addons: ["nuke", "harmony", "maya", "afterEffects"],
    github: "https://github.com/ynput/ayon-deadline",
    discussion: "https://community.ynput.io/tag/deadline",
};

export default addon;
