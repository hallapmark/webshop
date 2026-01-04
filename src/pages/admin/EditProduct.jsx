import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/categories")
      .then(res => res.json())
      .then(json => {
        setCategories(json);
        fetch(import.meta.env.VITE_BACKEND_URL + "/products/" + id)
          .then(res => res.json())
          .then(json => setProduct(json))
      })
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

    // Add token to headers
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/products", {
      method: "PUT",
      body: JSON.stringify(product),
      headers // Use the headers object with token
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(json => {
            if (json.message === "Token expired") {
              logout();
              navigate("/login");
            }
            throw new Error(json.message || "Failed to update");
          });
        }
        return res.json();
      })
      .then(() => {
        toast.success("Product updated!");
        navigate("/manage-products");
      })
      .catch(err => {
        toast.error(err.message || "Error updating product");
      });
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
        label="URL Slug"
        value={product.slug || ""}
        onChange={(e) => setProduct({...product, slug: e.target.value })}
      />
      <TextField
        label="Price (EUR)"
        type="number"
        value={product.price}
        onChange={(e) => setProduct({...product, price: Number(e.target.value) })}
      />
      <TextField
        label="Descriptio (English)"
        value={product.description_en}
        onChange={(e) => setProduct({...product, description_en: e.target.value })}
      />
      <TextField
        label="Description (Estonian)"
        value={product.description_et}
        onChange={(e) => setProduct({...product, description_et: e.target.value })}
      />
      <select defaultValue={product.category.id}
        onChange={(e) => setProduct({...product, category: {"id": e.target.value}})}>
        {categories.map(category => 
          <option key={category.id} value={category.id}>
            {category.name}
          </option>)}
      </select>
      <Button variant="contained" onClick={updateProduct}>Update</Button>
    </Box> 
  );
}

export default EditProduct
  