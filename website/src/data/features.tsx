// TYPES

import { DocType } from "./addons";

export type Feature = {
    title: string;
    description: string;
    preview?: string;
    docs?: { [type in DocType]?: String };
    tags?: string[];
};

const Features: (Feature & { id: string; addons: string[] })[] = [];
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

        // add id
        feature.id = key;
        // add tags array if none
        if (!feature.tags) {
            feature.tags = [];
        }
        // add addons array
        feature.addons = [];

        Features.push(feature);
    }
} catch (error) {
    console.error(error);
}

export default Features;
