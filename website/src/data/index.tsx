// export addons and features

import { sortBy } from "@site/src/utils/jsUtils";
import Addons from "./addons";
import Features, { type Feature as FeatureType } from "./features";

type Feature = FeatureType;
// create a list of tags from Features array
export const TagList: string[] = [];
[...Features, ...Addons].forEach((feature) => {
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

// sort addons
function sortAddons() {
    let result = Addons;
    // Sort by site name
    result = sortBy(result, (feature) => feature.title.toLowerCase());
    return result;
}

export const sortedAddons = sortAddons();
