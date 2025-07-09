import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Royal Render",
    description:
        "Royal Render is a powerful render farm management application that helps you organize, control, and check your renders.",
    icon: "royal-render-icon.png",
    badge: versions.RoyalRender_Badge,
    docs: {
        // user: "",
        admin: "https://help.ayon.app/en/help/articles/6879829-configure-royal-render-addon",
    },
    github: "https://github.com/ynput/ayon-royalrender",
    discussion: "https://community.ynput.io/tag/royalrender",
};

export default addon;
