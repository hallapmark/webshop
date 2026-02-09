import type { Category } from "./Category"

export type Product = {
  "id": number,
  "name": string,
  "slug": string,
  "description_en": string,
  "description_et": string,
  "price": number,
  "category": Category,
  "imageUrl": string | null
}

// For adding a new product to the server.
// Omit id, omit complex category object.
// Then add a simple categoryId back in.
export type ProductInput = Omit<Product, 'id' | 'category'> & {
  categoryId: number;
}