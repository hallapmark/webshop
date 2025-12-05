import { useState } from "react";
import { CartSumContext } from "./CartSumContext";

export const CartSumContextProvider = ({children}) => {
  // globaalne muutuja, mida hakkame väljastama
  const [cartSum, setCartSum] = useState(calculateTotal());

  function calculateTotal() {
    const cartLS = JSON.parse(localStorage.getItem("cart") || "[]");
    let sum = 0;
    cartLS.forEach(p => sum += p.price);
    return sum;
  }

  // increase, decrease on siin mõistlik muidu teha
  return(
    <CartSumContext.Provider value={{cartSum, setCartSum}}>
      {children}
    </CartSumContext.Provider>
  )
}