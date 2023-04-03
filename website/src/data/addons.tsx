export type DocType = "user" | "admin" | "developer";

export type Addon = {
    title: string;
    description: string;
    descriptionLong?: string;
    preview?: string;
    features?: string[];
    docs?: { [type in DocType]?: String };
    supports?: { label: string; docbase: string }[];
    supportsTitle?: string;
    github?: string;
    icon?: string;
};

// HOW TO CREATE AN ADDON TILE
// 1. create a json file in the addons folder called "myAddon.json"
// 2. use the following template (see example below or Addon type above)

// {
//     "title": "My Addon",
//     "description": "My Addon description",
//     "descriptionLong": "My Addon long description",
//     "preview": "myAddon.png",
//     "features": [ "workfiles", "publish" ],
//     "docs": {
//         "user": "user-guide-page",
//         "admin": "admin-guide-page",
//         "developer": "developer-guide-page"
//     },
//     "supports": [
//         {
//             "label": "Camera",
//             "docbase": "camera-docs"
//         },
//      ],
//     "supportsTitle": "Supports",
//     "github": "github-link"
// }

// NOTE: features = ["workfiles", "publish"] // these are the features that the addon supports
// You can find all features in the data/features/features.json file
// You can also add other addon ids to the features array to show that the addon supports those addons

// 3. add the preview image in the addons/img folder "myAddon.png"
// 4. add addon name ("myAddon") to either officialAddons or communityAddons

const officialAddons = [
    "nuke",
    "ftrack",
    "houdini",
    "maya",
    "afterEffects",
    "deadline",
    "hiero",
    "blender",
    "fusion",
    "harmony",
];

const communityAddons = [];

export const addonsIds = [...officialAddons, ...communityAddons];

// Top 8 addons
export const featuredAddons = [
    "nuke",
    "ftrack",
    "houdini",
    "maya",
    "deadline",
    "blender",
    "fusion",
    "hiero",
];

// load addons
const Addons: (Addon & { id: string })[] = addonsIds.flatMap((feature) => {
    try {
        const JSON = require(`./addons/${feature}.json`);

        if (JSON.preview) {
            try {
                // get img
                const img = require(`./addons/img/${JSON.preview}`);
                // add img to JSON
                JSON.preview = img;
            } catch (error) {
                delete JSON.preview;
            }
        }
        if (JSON.icon) {
            try {
                // get img
                const img = require(`./addons/img/${JSON.icon}`);
                // add img to JSON
                JSON.icon = img;
            } catch (error) {
                delete JSON.icon;
            }
        }

        // id
        JSON.id = feature;

        return JSON;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export default Addons;
