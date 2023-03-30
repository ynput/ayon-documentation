import { type Feature as Addon } from "./features";

// HOW TO ADD AN ADDON TILE
// 1. add a json file in the addons folder "myAddon.json"
// 2. add a preview image in the addons/img folder "myAddon.png"
// 3. add the addon name to the addons list "myAddon"

// List of addons to load
const addonsToLoad = [
    "nuke",
    "ftrack",
    "maya",
    "afterEffects",
    "deadline",
    "hiero",
];

// load addons
const Addons: Addon[] = addonsToLoad.flatMap((feature) => {
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

export default Addons;
