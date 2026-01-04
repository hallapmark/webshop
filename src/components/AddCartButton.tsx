import { toast } from "react-toastify";
import type { Product } from "../models/Product";
import { useContext } from "react";
import { CartSumContext } from "../context/CartSumContext";
import { Box, Button } from "@mui/material";
import type { CartProduct } from "../models/CartProduct";
import { useDispatch } from "react-redux";
import { increment } from "../store/counterSlice";

function AddCartButton(props: {addedProduct: Product, fullWidth?: boolean}) {
  const dispatch = useDispatch();
  const {cartSum, setCartSum} = useContext(CartSumContext);
  const { fullWidth = false } = props;

  const addToCart = (productClicked: Product) => {
    const cartLS: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const productFound = cartLS.find(cartProduct => cartProduct.product.id === productClicked.id);
    if (productFound !== undefined) {
      productFound.quantity++;
    } else {
      cartLS.push({quantity: 1, product: productClicked});
    }
    localStorage.setItem("cart", JSON.stringify(cartLS));
    toast.success(productClicked.name + " added to cart!");
    setCartSum(cartSum + productClicked.price);
    dispatch(increment());
  }

  return (
    <Box sx={{ width: "100%", mt: fullWidth ? 0 : "auto" }}>
      <Button fullWidth={fullWidth} variant="contained" color="accent" sx={{ py: 1.2 }} onClick={() => addToCart(props.addedProduct)}>
        Add to cart
      </Button>
      {/* mõni teeb nii, et ToastContainer ainult app.jsx-is, ainult seal. 
      Ja siis kutsud välja kui vaja */}
    </Box>
  )
}
export default AddCartButton