import familiesObject from "./data";
import { Families } from "./types";

// convert to array with key as an id
const families: Families = Object.keys(familiesObject).map((key) => ({
    id: familiesObject[key]?.id || key,
    ...familiesObject[key],
}));

export default families;

// export types
export type { Family, FamilyType } from "./types";
