import { useNavigate, useParams } from "react-router-dom"

// mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// icons
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';

import shopsFile from "../../data/tallinn_shops.json"

function ShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const found = shopsFile.find(shop => shop.id === id);

  if (found === undefined) {
    return <Typography variant="h6">Employee not found</Typography>
  }

  return (
    <Card sx={{ textAlign: "center" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6">{found.name}</Typography>
        <Box display='flex' justifyContent="center" alignItems='center' gap={2}>
          <PlaceIcon fontSize="small" />
          <Typography variant="body1">{found.address}</Typography>
        </Box>
        <Box display='flex' justifyContent="center" alignItems='center'  gap={2}>
          <CallIcon fontSize="small" />
          <Typography variant="body1">(+372) {found.telephone}</Typography>
        </Box>
        <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </CardContent>
    </Card>
  )
}

export default ShopDetail