import { useNavigate, useParams } from "react-router-dom"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import AddCartButton from "../../components/AddCartButton";

// Product Detail Page
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>({
    "id": 0,
    "slug": "",
    "name": "", 
    "description_en": "",
    "description_et": "",
    "price": 0,
    "category": {
      "id": 0,
      "name": ""
    }
  });

  useEffect(() => {
      fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + id)
        .then(res => res.json())
        .then(json => setProduct(json))
    }, [id]);

  if (product === undefined) {
    return <Typography variant="h6">Product not found</Typography>
  }

  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2">{product.price}€</Typography>
        <Typography variant="body2">{product.description_en}</Typography>
        <Typography variant="body2">{product.description_et}</Typography>
        <AddCartButton addedProduct={product} />
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductDetail
