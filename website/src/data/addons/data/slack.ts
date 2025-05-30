import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Slack",
    description: "Send publishing comments and previews to slack channels.",
    icon: "slack-icon.png",
    badge: versions.Slack_Badge,
    docs: {
        // user: "",
        admin: "https://help.ayon.app/articles/8988101-slack",
    },
    github: "https://github.com/ynput/ayon-slack",
    discussion: "https://community.ynput.io/tag/slack",
};

export default addon;
