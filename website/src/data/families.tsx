export type Family = {
    title: string;
    icon: string;
    docs?: string;
};

const Families: Family[] = [];
// import families JSON file and create a list of families
try {
    const familiesJSON = require("./families/families.json");

    for (const key in familiesJSON) {
        const feature = familiesJSON[key];
        // add id
        feature.id = key;

        // add to families array
        Families.push(feature);
    }
} catch (error) {
    console.error(error);
}

export default Families;
