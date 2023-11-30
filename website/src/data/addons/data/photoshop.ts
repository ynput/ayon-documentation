import { type Addon } from "../types";

const addon: Addon = {
    title: "Photoshop",
    description:
        "Photoshop is a powerful image editing software used by professionals and hobbyists alike to create, edit, and enhance digital images.",
    icon: "photoshop-icon.png",
    features: ["workfiles", "localRendering"],
    products: ["plate", "image", "layeredImage", "background"],
    docs: {
        user: "addon_photoshop_artist",
        admin: "addon_photoshop_admin",
    },
};

export default addon;
