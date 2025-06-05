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
        user: "https://help.ayon.app/articles/8465192-jira#xfsx3oy6ieo",
        admin: "https://help.ayon.app/articles/8465192-jira",
    },
    github: "https://github.com/ynput/ayon-jira",
    discussion: "https://community.ynput.io/tag/jira",
};

export default addon;
