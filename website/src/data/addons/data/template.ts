import { type Addon } from "../types";
import versions from "@site/docs/assets/json/Ayon_addons_version.json";

const addon: Addon = {
    title: "Addon Name",
    description:
        "This addon is awesome and does this and that. Try to keep to one line.",
    descriptionLong: "If there's more to say, add a long description here.",
    preview: "addon-name-preview.png",
    icon: "addon-name-icon.png",
    badge: versions.Teamplate_Badge,
    docs: {
        user: "artist_hosts_addonName",
        admin: "admin_hosts_addonName",
        developer: "developer_hosts_addonName",
    },
    github: "https://github.com/ynput/OpenPype/tree/develop/openpype/modules/example_addons",
    discussion: "https://community.ynput.io/",
    products: ["render", "plate", "image", "background"],
    features: ["localRendering", "workfiles"],
    addons: ["nuke", "flame"],
};

export default addon;

// title | The title of the addon | "Blender"
// description | A short description of the addon | "Blender is a great addon"
// descriptionLong? | A long description of the addon | "Blender is a great addon that does a lot of things"
// preview? | A preview image of the addon | "blender.png"
// icon? | A logo image of the addon | "blender-icon.png"
// features? | An array of features that the addon supports | ["workfiles", "loader"]
// products? | An array of products that the addon supports | ["image", "video", "model"]
// addons? | An array of addons that the addon supports | ["nuke", "maya"]
// docs? | Either an object of documentation links for the addon or a link to the doc in our new help center | { "user": "artist_hosts_blender", "admin": "admin_hosts_blender", "developer": "dev_publishing" }
// github? | A link to the github repository of the addon
// discussion? | A link to the forums filtered by the tag of the addon
// id? | The id of the addon, if not set (recommended) it will be the same as the filename | "blender"
