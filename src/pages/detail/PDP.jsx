import { useNavigate, useParams } from "react-router-dom"
import productFile from "../../data/products.json"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Product Detail Page
function PDP() {
  const { id } = useParams();
  const navigate = useNavigate();
  const found = productFile.find(item => item.id === id);

  if (found === undefined) {
    return <Typography variant="h6">Product not found</Typography>
  }

  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent>
        <Typography variant="h6">{found.name}</Typography>
        <Typography variant="body2">{found.price}€</Typography>
        <Typography variant="body2">{found.description}</Typography>
        <Typography variant="body2">{found.description_est}</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default PDP