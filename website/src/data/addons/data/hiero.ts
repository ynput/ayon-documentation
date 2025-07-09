import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Hiero",
    description: `
Professional-grade video editing and compositing software designed for film, TV,
and commercial post-production, offering seamless collaboration, streamlined workflows,
and efficient management of complex projects.

All the information also applies to _Nuke Studio(NKS)_.
We are supporting versions \`11.0\` and above.
    `,
    icon: "hiero.png",
    badge: versions.Hiero_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
        "reviewables",
        "burnins",
        "colorManaged",
    ],
    products: ["audio", "plate", "review", "frame", "effect", "workfile"],
    docs: {
        user: "https://help.ayon.app/articles/0417137-working-with-hiero-in-ayon",
        admin: "https://help.ayon.app/articles/3397387-configure-hiero-addon",
    },
    github: "https://github.com/ynput/ayon-hiero",
    discussion: "https://community.ynput.io/tag/hiero",
};

export default addon;
