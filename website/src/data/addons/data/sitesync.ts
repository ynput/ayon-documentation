import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Site Sync",
    description: `
Site Sync allows users and studios to synchronize published assets between multiple 'sites'.
    `,
    icon: "core-icon.png",
    badge: versions.SitSync_Badge,
    docs: {
        // user: "",
        admin: "https://help.ayon.app/en/help/articles/3882937-site-sync",
    },
    github: "https://github.com/ynput/ayon-sitesync",
    discussion: "https://community.ynput.io/tag/sitesync",
};

export default addon;
