import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from '@mui/material/CardContent';
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import productsFile from "../data/products.json"


function Home() {
  const [products, setProducts] = useState(productsFile.slice());

  const addToCart = (productId) => {
    
  }

  return (
    <Box m={4}>
      <Typography variant="h1" gutterBottom>Webshop</Typography>
      <br />
      <Typography variant="h3" gutterBottom>New arrivals</Typography>
      <Grid container spacing={4} alignItems="stretch" mx={2} my={4}>
        {products.map((product) => (
          <Grid
            // Grid is divided into 12
            // 2, 3, or 3 items in a row depending on screen size. 
            size={{ xs: 12, sm: 6, md: 4 }}  
            sx={{ display: "flex", flexDirection: "column" }}
            key={product.id}
          >
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", textAlign: "center" }}>
              <CardActionArea component={RouterLink} to={`/product/${product.id}`} sx={{ flexGrow: 1 }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.price}€</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </CardContent>
              </CardActionArea>
              <Divider />
              <Button variant="contained" color="accent" sx={{ mt:"auto", py: 1.2 }} onClick={() => addToCart(product.id)}>
                WIP: Add to cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
export default Home