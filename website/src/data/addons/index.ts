import { communityAddons, officialAddons } from "./addons";
import { type Addon } from "./types";

export const addonsIds = [...officialAddons, ...communityAddons];

export type AddonType = (typeof addonsIds)[number];

// load addons
const addons: Addon[] = addonsIds.flatMap((featureId) => {
    try {
        // import ts, js, JSON file
        let data: Addon;

        // try to load ts file
        try {
            data = require(`./data/${featureId}.ts`)?.default;
        } catch (error) {
            console.log("no ts file found");

            // try to load json file
            try {
                data = require(`./data/${featureId}.json`);
            } catch (error) {
                console.log("no json file found");
                return [];
            }
        }

        if (data.preview) {
            try {
                // get img
                const img = require(`./data/img/${data.preview}`);
                // add img to data
                data.preview = img;
            } catch (error) {
                console.log("no preview found");
                data.preview = undefined;
            }
        }
        if (data.icon) {
            try {
                // get img
                const img = require(`./data/img/${data.icon}`);
                // add img to data
                data.icon = img;
            } catch (error) {
                console.log("no icon found");
                data.icon = undefined;
            }
        }

        // id
        data.id = data.id || featureId;

        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
});

export default addons;

// export addonsIds, featuredAddons
export { featuredAddons, communityAddons, officialAddons } from "./addons";

// export types
export type { Addon, DocType } from "./types";
