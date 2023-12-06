import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Shotgrid",
    description:
        "ShotGrid is a cloud-based project management software that helps creative studios track and manage their projects, assets, and workflows.",
    icon: "shotgrid-icon.png",
    badge: versions.ShotGrid_Badge,
    features: ["projectManager"],
    github: "https://github.com/ynput/ayon-shotgrid",
    discussion: "https://community.ynput.io/t/shotgrid-integration-addon/63",
};

export default addon;
