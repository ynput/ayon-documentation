import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Jira",
    description:
        "Atlassian JIRA is ticketing support system which could be used as asset management system.",
    icon: "jira-icon.png",
    badge: versions.Jira_Badge,
    features: [
    ],
    products: [
    ],
    docs: {
        user: "addon_jira_artist",
        admin: "addon_jira_admin",
    },
    github: "https://github.com/ynput/ayon-jira",
};

export default addon;
