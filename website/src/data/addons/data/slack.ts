import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Slack",
    description:
        "Send publishing comments and previews to slack channels.",
    icon: "slack-icon.png",
    badge: versions.Slack_Badge,
    github: "https://github.com/ynput/ayon-slack",
    docs: {
        admin: "module_slack",
    },
};

export default addon;
