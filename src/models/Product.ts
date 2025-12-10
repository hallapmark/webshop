export type Product = {
  "id": number,
  "name": string, 
  "description": string,
  "description_est": string,
  "price": number,
  "category": {
    "id": number,
    "name": string
  }
}