import productsObject from "./data";
import { ProductType, Product as ProductTypeObject } from "./types";

export type Product = ProductTypeObject & { id: string };

// convert to array with key as an id
const products: Product[] = Object.keys(productsObject).map((key) => ({
    ...productsObject[key],
    id: (productsObject[key]?.id || key) as ProductType,
}));

export default products;

// export types
export type { ProductType } from "./types";
