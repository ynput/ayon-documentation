import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "DaVinci Resolve",
    description:
        "DaVinci Resolve is a professional non-linear editing and color grading software with a free version for basic editing and color correction.",
    icon: "resolve-icon.png",
    badge: versions.Resolve_Badge,
    docs: {
        user: "artist_hosts_resolve",
        admin: "admin_hosts_resolve",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/resolve",
};

export default addon;
