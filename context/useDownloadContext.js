import { createContext, useContext } from "react";
import downloadStates from "state/downloadState/downloadState";

const AppContext = createContext();

export const DownloadWrapper = ({ children }) => {
  const { downloadState, downloadDispatch } = downloadStates();
  let state = {
    // download state
    downloadDispatch,
    downloadState,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useDownloadContext = () => {
  return useContext(AppContext);
};
