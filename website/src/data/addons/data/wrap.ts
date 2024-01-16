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
        user: "addon_wrap_artist",
        admin: "addon_wrap_admin",
    },
};

export default addon;
