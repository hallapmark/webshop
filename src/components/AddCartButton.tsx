import { toast, ToastContainer } from "react-toastify";
import type { Product } from "../models/Product";
import { useContext } from "react";
import { CartSumContext } from "../context/CartSumContext";
import { Box, Button } from "@mui/material";

function AddCartButton(props: {addedProduct: Product}) {
  const {cartSum, setCartSum} = useContext(CartSumContext);

  const addToCart = (product: Product) => {
    const cartLS: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
    cartLS.push(product);
    localStorage.setItem("cart", JSON.stringify(cartLS));
    toast.success(product.name + " added to cart!");
    setCartSum(cartSum + product.price);
  }

  return (
    <Box>
      <Button variant="contained" color="accent" sx={{ mt:"auto", py: 1.2 }} onClick={() => addToCart(props.addedProduct)}>
        Add to cart
      </Button>
      <ToastContainer position="bottom-right" autoClose={4000} theme="dark" />
      {/* mõni teeb nii, et ToastContainer ainult app.jsx-is, ainult seal. 
      Ja siis kutsud välja kui vaja */}
    </Box>
  )
}
export default AddCartButton