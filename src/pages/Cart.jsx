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


// TODO: Add capability to add multiple items of the same type
function Cart() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [country, setCountry] = useState("EE");
  const [selectedParcelMachine, setSelectedParcelMachine] = useState("");
  const [parcelMachines, setParcelMachines] = useState([]);
  const [dbParcelMachines, setDbParcelMachines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {setCartSum} = useContext(CartSumContext);
  
  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => {
        setParcelMachines(json);
        setDbParcelMachines(json);
      })
  }, []);

  useEffect(() => {
    const filtered = dbParcelMachines.filter(
      pm =>
        pm.A0_NAME === country &&
        pm.NAME.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setParcelMachines(filtered);
    setSelectedParcelMachine(filtered[0]?.NAME || ""); // first match
  }, [dbParcelMachines, country, searchTerm]);


  function removeItemFromCart(index) {
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
      </Box>

      {products.length > 0 && 
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", mb: 5}}>
        <Typography variant="subtitle1" gutterBottom mt={2.5}>Cart total: {calculateTotal().toFixed(2)}€</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5 }}>
          <Button variant="contained" onClick={() => setCountry("EE")}>Eesti</Button>
          <Button variant="contained" onClick={() => setCountry("LV")}>Läti</Button>
          <Button variant="contained" onClick={() => setCountry("LT")}>Leedu</Button>
        </Box>
        <TextField 
            sx={{ minWidth: 200, maxWidth: 500}}
            id="outlined-search" 
            label="Search field" 
            type="search"
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 220, maxWidth: 550 }}>
          <InputLabel id="parcel-locker-label">Parcel Locker</InputLabel>
          <Select
            labelId="parcel-locker-label"
            value={selectedParcelMachine}
            label="Parcel Locker"
            onChange={(e) => setSelectedParcelMachine(e.target.value)}
          >
            {parcelMachines
              .map(pm => (
                <MenuItem key={pm.ZIP} value={pm.NAME}>
                  {pm.NAME}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      }

    </Box>
    
  )
}
export default Cart
