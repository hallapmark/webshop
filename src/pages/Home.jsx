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

import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { toast, ToastContainer } from "react-toastify";


function Home() {
  const [products, setProducts] = useState(productsFile.slice());
  const [sortNextAZAsc, setSortNextAZAsc] = useState(true);
  const [sortNextPriceAsc, setSortNextPriceAsc] = useState(true);
  const [lastSort, setLastSort] = useState(null); // 'az' | 'price' | null 

  const addToCart = (product) => {
    const cartLS = JSON.parse(localStorage.getItem("cart")) || [];
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
    toast.success(product.name + " added to cart!");
  }

  function sortAZ() {
    const sorted = products.slice().sort((a, b) =>
      sortNextAZAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setProducts(sorted);
    setSortNextAZAsc(!sortNextAZAsc);
    setLastSort('az');
  }

  function sortPrice() {
    const sorted = products.toSorted((a, b) => sortNextPriceAsc ? a.price - b.price : b.price - a.price);
    setProducts(sorted);
    setSortNextPriceAsc(!sortNextPriceAsc);
    setLastSort('price');
  }

  return (
    <Box m={4}>
      <Typography variant="h1" gutterBottom>Webshop</Typography>
      <br />
      <Typography variant="h3" gutterBottom>New arrivals</Typography>
      {/* TODO: Maybe some filters as well? */}
      {/* --- SORTING -- */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 1, mr: 2, gap: 1 }}
      >
        <Button 
          variant={lastSort === "az" ? "contained" : "outlined" }
          startIcon={<SortByAlphaIcon />} 
          onClick={sortAZ}>
          {sortNextAZAsc // if yes, we are CURRENTLY ZA
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />}
        </Button>
        <Button 
          variant={lastSort === "price" ? "contained" : "outlined" }
          startIcon={<AttachMoneyIcon />} 
          onClick={sortPrice}>
          {sortNextPriceAsc // if yes, current is descending (high price first)
            ? <ArrowDownwardIcon fontSize="small" /> 
            : <ArrowUpwardIcon fontSize="small" />}
        </Button>
      </Box>
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
              <Button variant="contained" color="accent" sx={{ mt:"auto", py: 1.2 }} onClick={() => addToCart(product)}>
                Add to cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  )
}
export default Home