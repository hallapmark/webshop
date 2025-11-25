import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import productsFile from "../../data/products.json"
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

function ChangeProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(productsFile.find(item => item.id === id));

  const updateCar = () => {
    if (product.price <= 0) {
      toast.error("Price cannot be zero or negative");
      return;
    }

    if (product.name.length < 2) {
      toast.error("The product name is too short");
      return;
    }

    const index = productsFile.findIndex((item) => item.id === id);
    productsFile[index] = product;

    navigate("/manage-products");
  };

  if (product === undefined) {
    return <Typography variant="h6">Product not found</Typography>
  }

  return (
    <Box
      sx={{
        maxWidth: 300,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>Edit Car</Typography>
      <TextField
        label="Name"
        value={product.name}
        onChange={(e) => setProduct({...product, name: e.target.value })}
      />
      <TextField
        label="Price (EUR)"
        type="number"
        value={product.price}
        onChange={(e) => setProduct({...product, price: Number(e.target.value) })}
      />
      <TextField
        label="Description"
        value={product.description}
        onChange={(e) => setProduct({...product, description: e.target.value })}
      />
      <TextField
        label="Description"
        value={product.description_est}
        onChange={(e) => setProduct({...product, description_est: e.target.value })}
      />
      <Button variant="contained" onClick={updateCar}>Update</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default ChangeProduct
  