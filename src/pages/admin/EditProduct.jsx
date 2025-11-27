import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import productsFile from "../../data/products.json"
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/products/" + id)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [id]);

  const updateProduct = () => {
    if (product.price <= 0) {
      toast.error("Price cannot be zero or negative");
      return;
    }

    if (product.name.length < 2) {
      toast.error("The product name is too short");
      return;
    }

    fetch("http://localhost:8080/products", {
      method: "PUT",
      body: JSON.stringify(product),
      headers : {
        "Content-Type": "application/json"
      }
    })
     .then(res => res.json())
     .then(() => navigate("/manage-products"))
  };

  if (product === undefined) {
    return <Typography variant="h6">Product not found</Typography>
  }

  if (product.id === undefined) {
    return <Typography variant="h6">Loading...</Typography>
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
      <Typography variant="h5" sx={{ textAlign: "center" }}>Edit Product</Typography>
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
      <Button variant="contained" onClick={updateProduct}>Update</Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
    </Box>
  );
}

export default EditProduct
  