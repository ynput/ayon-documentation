import { type Addon } from "../types";

const addon: Addon = {
    title: "DaVinci Resolve",
    description:
        "DaVinci Resolve is a professional non-linear editing and color grading software with a free version for basic editing and color correction.",
    icon: "resolve-icon.png",
    docs: {
        user: "addon_resolve_artist",
        admin: "addon_resolve_admin",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/hosts/resolve",
};

export default addon;
