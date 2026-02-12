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
// Omit id (backend-generated), omit complex category object, 
// omit imageUrl (backend generated).
// Then add a simple categoryId back in.
export type ProductInput = Omit<Product, 'id' | 'category' | 'imageUrl'> & {
  categoryId: number;
}