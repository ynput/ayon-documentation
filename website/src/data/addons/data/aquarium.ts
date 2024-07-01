import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const aquarium: Addon = {
    title: "Aquarium",
    description: "Aquarium is a project management platform for creatives.",
    descriptionLong:
        "This addon allow you to synchronize your Aquarium project to Ayon, by listening to events. You can also trigger a full project sync to gather Aquarium's data to Ayon. You can also create Aquarium project using existing Ayon ones.",
    icon: "aquarium-icon.png",
    badge: versions.Aquarium_Badge,
    docs: {
        user: "addon_aquarium_artist",
        admin: "addon_aquarium_admin",
        developer: "addon_aquarium_developer",
    },
    github: "https://github.com/ynput/ayon-aquarium",
    products: ["render", "plate", "image", "background", "review"],
    features: [
        "appLauncher",
        "reviewables",
        "trayPublisher",
        "projectManager",
        "aquariumSync",
    ],
};

export default aquarium;
