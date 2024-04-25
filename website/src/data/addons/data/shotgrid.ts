import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Flow (Shotgrid)",
    description:
        "Flow (ShotGrid) is a cloud-based project management software that helps creative studios track and manage their projects, assets, and workflows.",
    icon: "flow-icon.png",
    features: ["sgSync"],
    badge: versions.Flow_Badge,
    github: "https://github.com/ynput/ayon-shotgrid",
    discussion: "https://community.ynput.io/t/shotgrid-integration-addon/63",
};

export default addon;
