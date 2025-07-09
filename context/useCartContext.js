import { createContext, useContext } from "react";
import cartStates from "state/cartState/cartState";

const AppContext = createContext();

export const CartWrapper = ({ children }) => {
  const { cartState, cartDispatch } = cartStates();
  let state = {
    cartDispatch,
    cartState,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useCartContext = () => {
  return useContext(AppContext);
};
