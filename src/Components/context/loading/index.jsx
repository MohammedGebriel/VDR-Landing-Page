/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  return (
    <LoadingContext.Provider value={{ open, close, visible, toggle }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingOverlay = () => useContext(LoadingContext);
