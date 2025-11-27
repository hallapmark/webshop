import { useNavigate, useParams } from "react-router-dom"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";

// Product Detail Page
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
      fetch("http://localhost:8080/products/" + id)
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
        <Typography variant="body2">{product.description}</Typography>
        <Typography variant="body2">{product.description_est}</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductDetail
