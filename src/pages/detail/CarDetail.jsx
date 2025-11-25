import { useNavigate, useParams } from "react-router-dom"
import carsFile from "../../data/cars.json"

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const found = carsFile.find(item => item.id === id);

  if (found === undefined) {
    return <Typography variant="h6">Car not found</Typography>
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6">{found.name}</Typography>
        <Typography variant="body2">{found.price}€</Typography>
        <Typography variant="body2">{found.image}</Typography>
        <Typography variant="body2">{!found.active && <i>The car is inactive</i>}</Typography>

        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default CarDetail
