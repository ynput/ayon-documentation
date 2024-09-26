import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Version Control",
    description:
        "The AYON Version Control addon implements a generic API that can be used with various version control systems, with a primary focus on Perforce.",
    icon: "perforce-icon.png",
    badge: versions.VersionControl_Badge,
    features: [
    ],
    products: [

    ],
    docs: {
        admin: "category/version-control",
    },
    github: "https://github.com/ynput/ayon-version-control",
};

export default addon;
