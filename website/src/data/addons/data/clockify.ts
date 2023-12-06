import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Clockify",
    description:
        "Clockify is a free time tracking software that helps you track your time across projects and tasks.",
    badge: versions.Clockify_Badge,
    docs: {
        admin: "module_clockify",
    },
    icon: "clockify-icon.png",
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/clockify",
};

export default addon;
