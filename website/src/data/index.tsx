// export addons and features

import { sortBy } from "@site/src/utils/jsUtils";
import Addons from "./addons";
import Features, { type Feature as FeatureType } from "./features";

export type Feature = FeatureType;
// create a list of tags from Features array
export const TagList: string[] = [];
Features.forEach((feature) => {
    feature.tags.forEach((tag) => {
        if (!TagList.includes(tag)) {
            TagList.push(tag);
        }
    });
});

// filter TagList to remove tags that are used in Addons
Addons.forEach((addon) => {
    addon.tags.forEach((tag) => {
        if (TagList.includes(tag)) {
            TagList.splice(TagList.indexOf(tag), 1);
        }
    });
});

function sortFeatures() {
    let result = [...Addons, ...Features];
    // Sort by site name
    result = sortBy(result, (feature) => feature.title.toLowerCase());
    // sort by if has addon
    result = sortBy(
        result,
        (feature) => !(feature.tags?.indexOf("addon") > -1)
    );

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
