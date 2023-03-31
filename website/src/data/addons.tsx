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
};

export const officialAddons = [
    "nuke",
    "ftrack",
    "maya",
    "afterEffects",
    "deadline",
    "hiero",
];

// HOW TO ADD AN ADDON TILE
// 1. add a json file in the addons folder "myAddon.json"
// 2. add a preview image in the addons/img folder "myAddon.png"
// 3. add the addon name to the addons list "myAddon"

// Add your addon name to the list below
// needs to match the filename of the json file
const communityAddons = [];

export const addonsIds = [...officialAddons, ...communityAddons];

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

        // id
        JSON.id = feature;

        return JSON;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export default Addons;
