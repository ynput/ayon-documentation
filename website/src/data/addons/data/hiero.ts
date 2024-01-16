import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Hiero",
    description: `
Professional-grade video editing and compositing software designed for film, TV,
and commercial post-production, offering seamless collaboration, streamlined workflows,
and efficient management of complex projects.

**Variants**: _Hiero_, _NukeStudio_

**Versions**: \`11.3\`, \`12.2\`, \`13.2\`, \`14.0\`
    `,
    preview: "hiero.png",
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
        user: "addon_hiero_artist",
        admin: "addon_hiero_admin",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/hiero",
};

export default addon;
