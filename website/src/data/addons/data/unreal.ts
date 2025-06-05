import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Unreal Engine",
    description:
        "Unreal Engine is a powerful real-time 3D creation tool used by game developers, architects, filmmakers, and others.",
    descriptionLong: `
Unreal Engine is a powerful real-time 3D creation tool used by game developers, architects, filmmakers, and others.

**Supported Versions**: \`Unreal Engine 5.0\` and above.
    `,
    icon: "unreal-icon.png",
    badge: versions.Unreal_Badge,
    features: ["loader", "publisher", "sceneManager"],
    products: [
        "model",
        "pointcache",
        "look",
        "rig",
        "layout",
        "camera",
        "render",
    ],
    docs: {
        user: "https://help.ayon.app/articles/2228078-working-with-unreal-in-ayon",
        admin: "https://help.ayon.app/articles/1738168-setup-unreal-addon",
    },
    github: "https://github.com/ynput/ayon-unreal",
    discussion: "https://community.ynput.io/tag/unreal-engine",
};

export default addon;
