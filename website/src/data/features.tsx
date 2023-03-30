// TYPES
export type DocType = "user" | "admin" | "developer";

export type Feature = {
    title: string;
    description: string;
    descriptionLong?: string;
    preview?: string;
    tags: string[];
    docs?: { [type in DocType]?: String };
    supports?: { label: string; docbase: string }[];
    supportsTitle?: string;
    github?: string;
};

const Features: Feature[] = [];
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

        Features.push(feature);
    }
} catch (error) {
    console.error(error);
}

export default Features;
