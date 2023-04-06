import familiesObject from "./data";
import { FamilyType, Family as FamilyTypeObject } from "./types";

export type Family = FamilyTypeObject & { id: string };

// convert to array with key as an id
const families: Family[] = Object.keys(familiesObject).map((key) => ({
    ...familiesObject[key],
    id: (familiesObject[key]?.id || key) as FamilyType,
}));

export default families;

// export types
export type { FamilyType } from "./types";
