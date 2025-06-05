import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "SpeedTree",
    description:
        "SpeedTree is the industry-standard vegetation toolkit for projects of any size and style, used across both games and film.",
    icon: "speedtree-icon.png",
    badge: versions.SpeedTree_Badge,
    features: [
        "workfiles",
        "publisher",
    ],
    products: ["workfile", "model"],
    docs: {
        user: "https://help.ayon.app/articles/1430359-working-with-speedtree-in-ayon",
        admin: "https://help.ayon.app/articles/9963950-configure-speedtree-addon",
    },
    github: "https://github.com/ynput/ayon-speedtree",
    discussion: "https://community.ynput.io/tag/speedtree",
};

export default addon;
