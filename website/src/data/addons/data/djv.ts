import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "DJV",
    description: `
This addon adds action plugins to other AYON addons to launch DJV.
The addon does not contain DJV executables, only allows you to set them up in the addon settings.
    `,
    icon: "djv-icon.png",
    badge: versions.DJV_Badge,
    docs: {
        user: "https://help.ayon.app/en/help/articles/0533566-djv#2zfemesc28e",
        admin: "https://help.ayon.app/en/help/articles/0533566-djv#satc4wd2tsd",
    },
    github: "https://github.com/ynput/ayon-djv",
    discussion: "https://community.ynput.io/tag/djv",
};

export default addon;
