import { useContext,  useState } from "react";
import "../css/Cart.css"
// import { Link as RouterLink } from "react-router-dom";

// import FormControl from "@mui/material/FormControl";
// import IconButton from "@mui/material/IconButton";
// import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// import Select from "@mui/material/Select";

import DeleteIcon from '@mui/icons-material/Delete';
import { CartSumContext } from "../context/CartSumContext";
// import type { Product } from "../models/Product";
import ParcelMachines from "../components/ParcelMachines";
import { useDispatch } from "react-redux";
import type { CartProduct } from "../models/CartProduct";
import { decrement, decrementByAmount, increment, empty } from "../store/counterSlice";
// import { Badge } from "@mui/material";

function Cart() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState<CartProduct[]>(JSON.parse(localStorage.getItem("cart") || "[]"));
  const {setCartSum} = useContext(CartSumContext);

  function decreaseQuantity(index: number) {
    dispatch(decrement());
    products[index].quantity--;
    if (products[index].quantity === 0) {
      removeItemFromCart(index);
    } else {
      localStorage.setItem("cart", JSON.stringify(products));
      setProducts(products.slice()); 
      setCartSum(calculateTotal());
    }
  }

  function increaseQuantity(index: number) {
    dispatch(increment());
    products[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(products));
    setProducts(products.slice());
    setCartSum(calculateTotal());
  }

  function removeItemFromCart(index: number) {
    dispatch(decrementByAmount(products[index].quantity));
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
    dispatch(empty());
    setProducts([]);
    localStorage.setItem("cart", "[]");
    setCartSum(0);
  }

  function calculateTotal() {
    let sum = 0;
    products.forEach(p => sum += p.product.price * p.quantity);
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
          {products.map((cartProduct, index) => (
            <div key={cartProduct.product.id} className="map">
              <span>{cartProduct.product.name} </span>
              <span>{cartProduct.product.price}€ </span>
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <span>{cartProduct.quantity} items</span>
              <button onClick={() => increaseQuantity(index)}>+</button>
              <span><b>{(cartProduct.product.price * cartProduct.quantity).toFixed(2)}€</b></span>
              <button onClick={() => removeItemFromCart(index)}><DeleteIcon /></button>
            </div>
            // <ListItem 
            //   disablePadding 
            //   key={index} 
            //   // id ei ole siin unikaalne! 
            //   secondaryAction=
            //   {
            //     <IconButton edge="end" aria-label="delete" onClick={() => removeItemFromCart(index)}>
            //       <DeleteIcon />
            //     </IconButton>
            //   }
            // >
            //   <ListItemButton component={RouterLink} to={`/product/${cartProduct.product.id}`} >
            //     <ListItemText primary={cartProduct.product.name} secondary={`${cartProduct.product.price}€`} />
            //   </ListItemButton>
            // </ListItem> 
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