import { createContext, useContext } from "react";
import orderStates from "state/orderState/orderState";

const AppContext = createContext();
export const OrderWrapper = ({ children }) => {
  const { orderState, orderDispatch } = orderStates();
  let state = {
    // order state
    orderDispatch,
    orderState,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useOrderContext = () => {
  return useContext(AppContext);
};
