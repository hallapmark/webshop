import type { Category } from "./Category"

export type Product = {
  "id": number,
  "name": string,
  "slug": string,
  "description_en": string,
  "description_et": string,
  "price": number,
  "category": Category
}