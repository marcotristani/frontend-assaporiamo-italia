import { useState, useContext, createContext } from "react";
import axios from "axios";

import Loader from "../components/Loader";

const MainContext = createContext();

export function MainProvider({ children }) {
  //setter loader
  const [isLoading, setIsLoading] = useState(false);

  const endpointBase = import.meta.env.VITE_API_URL_BASE;

  function fetchResponse(fineEndpoint, setter) {
    //attivo loader
    setIsLoading(true);
    //chiamata
    axios
      .get(`${endpointBase}${fineEndpoint}`)
      .then((res) => {
        setter(res.data);
      })
      .catch((err) => {
        console.log("Regioni non trovate", err);
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 500),
      );
  }

  return (
    // passo products con array dei prodotti e search per ricerca
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchResponse,
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
