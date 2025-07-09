import { createContext, useContext } from "react";
import userStates from "state/userState/userState";

const AppContext = createContext();

export const UserWrapper = ({ children }) => {
  const { userState, userDispatch } = userStates();
  let state = {
    // user state
    userDispatch,
    userState,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useUserContext = () => {
  return useContext(AppContext);
};
