import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Mocha Pro",
    description:
        `Mocha Pro is a world-renowned software and plugin for planar motion tracking, 3D tracking, 
        rotoscoping, object removal, image stabilization, and PowerMesh organic warp tracking.
        `,
    icon: "mochapro-icon.png",
    badge: versions.Mocha_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
    ],
    products: [
        "matteshapes",
        "trackpoints",
        "workfile",
    ],
    docs: {
        user: "addon_mochapro_artist",
        admin: "addon_mochapro_admin",
    },
    github: "https://github.com/ynput/ayon-mocha",
};

export default addon;
