import { createContext } from "react";

export const CartSumContext = createContext({
  cartSum: 0,
  setCartSum: (_newSum: number) => {console.log(_newSum)}
});
// tuleb öelda, et kui ei saada väärtusi kätte/kes ei saa ligipääsu, mis siis väärtused temale on ülal sulgudes antud.