import { useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";

import DeleteIcon from '@mui/icons-material/Delete';
import { CartSumContext } from "../context/CartSumContext";
import type { Product } from "../models/Product";
import ParcelMachines from "../components/ParcelMachines";


// TODO: Add capability to add multiple items of the same type
function Cart() {
  const [products, setProducts] = useState<Product[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const {setCartSum} = useContext(CartSumContext);

  function removeItemFromCart(index: number) {
    //const index = products.find(product => product.id === id); 
    
    // find leiab esimese
    // alati kustutab niimodi esimese ainult kui ykskoik millisel delete vajutan
    // bugi p6hjus
    // const productsCopy = products.slice();
    // productsCopy.splice(index,1);
    // localStorage.setItem("cart", JSON.stringify(productsCopy));
    // nii ei toimi

    products.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(products));
    setProducts(products.slice()); // setter mõjub alles siis kui funktsioon läbi
    setCartSum(calculateTotal());
    // huvitav koht, vt. koopia käitumine
  }

  function emptyCart() {
    setProducts([]);
    localStorage.setItem("cart", "[]");
    setCartSum(0);
  }

  function calculateTotal() {
    let sum = 0;
    products.forEach(p => sum += p.price);
    // funktsioon võiks ikka numbri tagastada, mitte toFixed (mis on string)
    // toFixed alles html-is
    return sum;
  }

  return (
    <Box textAlign="center">
      <Typography variant="h1" gutterBottom mt={2.5}>Cart</Typography>
      <Button variant="outlined" onClick={emptyCart}>Empty Cart</Button>
      <Box sx={{ maxWidth: 'sm', mx: 'auto' }}>
        <List sx={{ px: 1.5 }}>
          {products.map((product, index) => (
            <ListItem 
              disablePadding 
              key={index} 
              // id ei ole siin unikaalne! 
              secondaryAction=
              {
                <IconButton edge="end" aria-label="delete" onClick={() => removeItemFromCart(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton component={RouterLink} to={`/product/${product.id}`} >
                <ListItemText primary={product.name} secondary={`${product.price}€`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" gutterBottom mt={2.5}>Cart total: {calculateTotal().toFixed(2)}€</Typography>
      </Box>
      
      {products.length > 0 && 
        <ParcelMachines />
      }

    </Box>
    
  )
}
export default Cart

// yle 200-300 rea tavaliselt ei lasta faili