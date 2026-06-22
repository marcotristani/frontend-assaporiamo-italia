import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";

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
      .finally(setIsLoading(false));
  }

  const location = useLocation();

  const queryAttuali = new URLSearchParams(location.search);
  const categoriaSlug = queryAttuali.get("categoria");

  const querySenzaCategoria = new URLSearchParams(location.search);
  querySenzaCategoria.delete("categoria");
  const stringaQueryRimanenti = querySenzaCategoria.toString()
    ? `?${querySenzaCategoria.toString()}`
    : "";

  const navigate = useNavigate();
  const [isOrdinato, setIsOrdinato] = useState(false);

  // Sincronizziamo lo stato ogni volta che l'URL nel browser cambia
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setIsOrdinato(query.get("order") === "alfabetico");
  }, [location.search]);

  // 2. La funzione che viene scatenata al click del BottoneOrdinamento
  const gestisciOrdinamento = () => {
    const query = new URLSearchParams(location.search);

    if (query.get("order") === "alfabetico") {
      query.delete("order"); // Se c'è già, lo toglie (Toggle)
    } else {
      query.set("order", "alfabetico"); // Se non c'è, lo aggiunge
    }

    // Spinge il nuovo URL nel browser mantenendo intatti gli altri filtri (ricerca, categoria)
    navigate(`${location.pathname}?${query.toString()}`);
  };

  return (
    // passo products con array dei prodotti e search per ricerca
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchResponse,
        isOrdinato,
        categoriaSlug,
        stringaQueryRimanenti,
        gestisciOrdinamento,
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
