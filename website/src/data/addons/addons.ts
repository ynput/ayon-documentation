import { AddonType } from ".";

// HOW TO CREATE AN ADDON CARD

// 1. duplicate template.ts (or any other addon) in the data folder as a template to get started
// 2. rename the file to your addon name (e.g. myAddon.ts)
// 3. fill in the addon data
// 4. add the preview or icon image in the addons/img folder "myAddon-icon.png" or "myAddon-preview.png"
// 5. add addon name ("myAddon") to either officialAddons or communityAddons

// FILE TYPES
// You can use either a .ts (recommended) or .json file
// If you use a .ts file you can use intellisense to help you write the file
// Take a look at the types.ts file to see what you can add to the addon object

// USING A LOGO IMAGE (recommended)
// Logo images should be 1:1 ratio (square) and have a transparent background
// When using a icon image, a blurred background will be generated and a color palette will be extracted from the image

// USING A PREVIEW IMAGE
// Sometimes icon images doesn't work as expected, in that case you can add a preview image that will be used instead
// Preview images should be around 1:2 ratio (landscape), include a blurred background and have the text "myAddon Addon" baked into the image.
// It's harder to match a preview image to the rest of the addons so it's recommended to use a icon image when possible

// OFFICIAL ADDONS
export const officialAddons = [
    "core",
    "3dsmax",
    "afterEffects",
    "blender",
    "celaction",
    "clockify",
    "resolve",
    "deadline",
    "flame",
    "ftrack",
    "fusion",
    "harmony",
    "hiero",
    "houdini",
    "maya",
    "nuke",
    "photoshop",
    "royalRender",
    "shotgrid",
    "substancepainter",
    "slack",
    "tvpaint",
    "unreal",
    "wrap",
] as const;

// COMMUNITY ADDONS
export const communityAddons = ["kitsu"] as const;

// featured addons
// pick addons from community or official to be featured on the homepage
export const featuredAddons: AddonType[] = [
    "afterEffects",
    "blender",
    "ftrack",
    "houdini",
    "maya",
    "nuke",
    "shotgrid",
    "unreal",
];
