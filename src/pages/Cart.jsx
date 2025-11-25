import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import DeleteIcon from '@mui/icons-material/Delete';

function Cart() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  function removeItemFromCart(id) {
    const index = products.find(product => product.id === id);
    const productsCopy = products.slice();
    productsCopy.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(productsCopy));
    setProducts(productsCopy);
  }

  function emptyCart() {
    setProducts([]);
    localStorage.setItem("cart", "[]");
  }

  return (
    <Box textAlign="center">
      <Typography variant="h1" gutterBottom mt={2.5}>Cart</Typography>
      <Button variant="outlined" onClick={emptyCart}>Empty Cart</Button>
      <Box sx={{ maxWidth: 'sm', mx: 'auto' }}>
        <List sx={{ px: 1.5 }}>
          {products.map((product) => (
            <ListItem 
              disablePadding 
              key={product.id} 
              secondaryAction=
              {
                <IconButton edge="end" aria-label="delete" onClick={() => removeItemFromCart(product.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton component={RouterLink} to={`/product/${product.id}`} >
                <ListItemText primary={product.name} secondary={product.price} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
    
  )
}
export default Cart