import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import carsFile from '../../data/cars.json'

import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

function CarsPLP() {
  const [cars, setCars] = useState(carsFile.slice());
  const { t } = useTranslation();

  const addToCart = (carId) => {
    
  }
  
  return (
    <Box>
      <Typography variant="h1" sx={{mx: 3, mt: 4}}>{t('cars.cars')}</Typography>
      <Grid container spacing={3} margin={2}>
        {cars.map((car) => (
          // 12 kokku mui Grid-süsteemis. xs ekraanisuuruse korral üks item võtab siin 12 kohta,
          // ja siis sealt hakkab alla tulema sm 6 jne.
          <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={car.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
              <CardActionArea component={RouterLink} to={`/car/${car.id}`} sx={{ flexGrow: 1 }}>
                <CardContent>
                  {/* See here for variants https://mui.com/material-ui/react-typography/ */}
                  <Typography variant="h6">{car.name}</Typography>
                  <Typography variant="body2">{car.price}€</Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <Button variant="contained" color="accent" sx={{ mt:"auto", py: 1.2 }} onClick={() => addToCart(car.id)}>
                WIP: Add to cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default CarsPLP