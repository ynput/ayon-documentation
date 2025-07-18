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
        user: "https://help.ayon.app/articles/0309485-working-with-mocha-pro-in-ayon",
        admin: "https://help.ayon.app/articles/3864909-mocha-pro-addon-settings",
    },
    github: "https://github.com/ynput/ayon-mocha",
    discussion: "https://community.ynput.io/tag/mocha-pro",
};

export default addon;
