// export addons and features
import addons from "./addons";
import features from "./features";
import products from "./products";

// export addons
export { addons };
export {
    addonsIds,
    communityAddons,
    officialAddons,
    featuredAddons,
} from "./addons";
export type { Addon, AddonType, DocType } from "./addons";

// export features
export { features };
export { topFeatures } from "./features";
export type { Feature, FeatureType } from "./features";

// export products
export { products };
export type { Product, ProductType } from "./products";
