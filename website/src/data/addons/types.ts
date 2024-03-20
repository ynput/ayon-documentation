import { AddonType } from ".";
import { type ProductType } from "../products/types";
import { type FeatureType } from "../features/types";

export type DocType = "user" | "admin" | "developer";

export type Addon = {
    title: string;
    description: string;
    descriptionLong?: string;
    preview?: string;
    icon?: string;
    badge?: string;
    features?: FeatureType[];
    products?: ProductType[];
    addons?: AddonType[];
    docs?: { [type in DocType]?: string };
    github?: string;
    discussion?: string;
    id?: string;
};

// title | The title of the addon | "Blender"
// description | A short description of the addon | "Blender is a great addon"
// descriptionLong | A long description of the addon | "Blender is a great addon that does a lot of things"
// preview | A preview image of the addon | "blender.png"
// icon | A logo image of the addon | "blender-icon.png"
// features | An array of features that the addon supports | ["workfiles", "loader"]
// products | An array of products that the addon supports | ["image", "video", "model"]
// addons | An array of addons that the addon supports | ["nuke", "maya"]
// docs | An object of documentation links for the addon | { "user": "artist_hosts_blender", "admin": "admin_hosts_blender", "developer": "dev_publishing" }
// github | A link to the github code repository of the addon
// discussion | A link to the discussion forum of the addon
// id | The id of the addon, if not set (recommended) it will be the same as the filename | "blender"
