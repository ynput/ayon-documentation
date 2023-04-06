import featuresObject from "./data";
import { type Features, type Feature } from "./types";

// convert to array with key as an id
// check if preview exists
const features: Features = Object.keys(featuresObject).map((key) => {
    const feature = featuresObject[key] as Feature;
    // check if preview exists
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
    feature.id = feature.id || key;

    return feature;
});

export default features;

// export types
export type { Features, Feature };
export type { FeatureType } from "./types";
