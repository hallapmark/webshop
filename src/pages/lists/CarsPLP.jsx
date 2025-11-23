
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import carsFile from '../../data/cars.json'
import { useState } from 'react';
import { Box } from '@mui/material';

function CarsPLP() {
  const [cars, setCars] = useState(carsFile.slice());

  return (
    <Box>
      <Typography variant="h1" sx={{mx: 3, mt: 4}}>Cars</Typography>
      <Grid container spacing={3} margin={2}>
        {cars.map((car) => (
          // 12 kokku mui Grid-süsteemis. xs ekraanisuuruse korral üks item võtab siin 12 kohta,
          // ja siis sealt hakkab alla tulema sm 6 jne.
          <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}} key={car.id}>
            <Card>
              <CardContent>
                {/* See here for variants https://mui.com/material-ui/react-typography/ */}
                <Typography variant="h6">{car.name}</Typography>
                <Typography variant="body2">{car.price}€</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default CarsPLP