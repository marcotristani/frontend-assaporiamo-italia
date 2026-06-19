import { useState, useContext, createContext } from "react";

import Loader from "../components/Loader";

const MainContext = createContext();

export function MainProvider({ children }) {
  //setter loader
  const [isLoading, setIsLoading] = useState(false);

  return (
    // passo products con array dei prodotti e search per ricerca
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  const context = useContext(MainContext);
  return context;
}
