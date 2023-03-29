import { sortBy } from "@site/src/utils/jsUtils";

// TYPES
export type DocType = "user" | "admin" | "developer";

export type Feature = {
    title: string;
    description: string;
    preview?: string;
    tags: string[];
    docs?: { [type in DocType]?: String };
    families?: string[];
};

export type Tag = {
    label: string;
    feature?: string;
};

const featuresList: Feature[] = [];
// import features JSON file and create a list of features
try {
    const featuresJSON = require("./features/features.json");

    for (const key in featuresJSON) {
        const feature = featuresJSON[key];

        if (feature.preview) {
            try {
                // get img
                const img = require(`./features/img/${feature.preview}`);

                // add img to JSON
                feature.preview = img;
            } catch (error) {
                delete feature.preview;
            }
        }

        featuresList.push(feature);
    }
} catch (error) {
    console.error(error);
}

// HOW TO ADD AN ADDON TILE
// 1. add a json file in the addons folder "myAddon.json"
// 2. add a preview image in the addons/img folder "myAddon.png"
// 3. add the addon name to the addons list "myAddon"

// List of addons to load
const addons = ["nuke", "ftrack"];

// load addons
const addonsList: Feature[] = addons.flatMap((feature) => {
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

        // add the addon tag
        JSON.tags.push("addon");

        return JSON;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export const Features = [...addonsList, ...featuresList];

// create a list of tags from Features array
export const TagList: string[] = [];
Features.forEach((feature) => {
    feature.tags.forEach((tag) => {
        if (!TagList.includes(tag)) {
            TagList.push(tag);
        }
    });
});

function sortFeatures() {
    let result = Features;
    // Sort by site name
    result = sortBy(result, (feature) => feature.title.toLowerCase());
    return result;
}

export const sortedFeatures = sortFeatures();
