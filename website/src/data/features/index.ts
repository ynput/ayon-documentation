import featuresObject from "./data";
import { FeatureType, type Feature as FeatureObjectType } from "./types";

// convert to array with key as an id
// check if preview exists
const features: Feature[] = Object.keys(featuresObject).map((key) => {
    const feature = featuresObject[key] as Feature;
    // check if preview exists
    if (feature.preview) {
        try {
            // get img
            const img = require(`./img/${feature.preview}`);

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

type Feature = FeatureObjectType & { id: FeatureType };

// export types
export type { Feature };
export type { FeatureType } from "./types";
