import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Wrap",
    description:
        "Faceform Wrap is the industry-leading topology transfer tool that helps create digital characters based on 3D scans of real actors or sculpts.",
    icon: "faceform_wrap.png",
    badge: versions.Wrap_Badge,
    features: [
        "workfiles",
        "loader",
        "publisher",
        "sceneManager",
        "libraryLoader",
    ],
    products: ["wrap", "workfile"],
    docs: {
        user: "https://help.ayon.app/articles/1462992-working-with-wrap-in-ayon",
        admin: "https://help.ayon.app/articles/0840796-wrap-addon-settings",
    },
    github: "https://github.com/ynput/ayon-wrap",
    discussion: "https://community.ynput.io/tag/wrap",
};

export default addon;
