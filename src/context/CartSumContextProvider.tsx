import { useState, type ReactNode } from "react";
import { CartSumContext } from "./CartSumContext";
import type { Product } from "../models/Product";
import type { CartProduct } from "../models/CartProduct";

export const CartSumContextProvider = ({children}: {children: ReactNode}) => {
  // globaalne muutuja, mida hakkame väljastama
  const [cartSum, setCartSum] = useState(calculateTotal());

  function calculateTotal() {
    const cartLS: CartProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    let sum = 0;
    cartLS.forEach(p => sum += p.product.price * p.quantity);
    return sum;
  }

  // increase, decrease on siin mõistlik muidu teha
  return(
    <CartSumContext.Provider value={{cartSum, setCartSum}}>
      {children}
    </CartSumContext.Provider>
  )
}