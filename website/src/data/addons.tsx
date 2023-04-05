export type DocType = "user" | "admin" | "developer";

export type Addon = {
    title: string;
    description: string;
    descriptionLong?: string;
    preview?: string;
    icon?: string;
    features?: string[];
    families?: string[];
    docs?: { [type in DocType]?: String };
    github?: string;
};

// HOW TO CREATE AN ADDON TILE
// 1. create a json file in the addons folder called "myAddon.json"
// 2. use the following template (see example below or Addon type above)

// {
//     "title": "My Addon",
//     "description": "My Addon description",
//     "descriptionLong": "My Addon long description",
//     "preview": "my-addon.png",
//     "icon": "my-addon-icon.png",
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

// ICONS AND PREVIEW IMAGES
// Icon images should be 1:1 ratio (square) and have a transparent background
// When using an icon image a blurred background will be generated and a color pallet will be extracted from the image
// Sometimes this doesn't work as expected, in that case you can add a preview image that will be used instead
// Preview images should be around 1:2 ratio (landscape), include a blurred background and have the text "myAddon Addon" baked into the image.

// NOTE: features = ["workfiles", "publish"] // these are the features that the addon supports
// You can find all features in the data/features/features.json file
// You can also add other addon ids to the features array to show that the addon supports those addons

// 3. add the preview image in the addons/img folder "myAddon.png"
// 4. add addon name ("myAddon") to either officialAddons or communityAddons

// TODO: add all families and features to each addon
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
    "tvpaint",
    "photoshop",
    "shotgrid",
    "celaction",
    "clockify",
    "flame",
    "kitsu",
    "muster",
    "resolve",
    "royalRender",
    "unreal",
    "slack",
];

const communityAddons = [];

export const addonsIds = [...officialAddons, ...communityAddons];

// Top 8 addons
// DONE: all families have been added to "featured" addons
export const featuredAddons = [
    "nuke",
    "ftrack",
    "houdini",
    "maya",
    "deadline",
    "blender",
    "unreal",
    "shotgrid",
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
