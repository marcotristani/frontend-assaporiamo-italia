import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const MainContext = createContext();

export function MainProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const endpointBase = import.meta.env.VITE_API_URL_BASE;

  const location = useLocation();
  const navigate = useNavigate();
  const [isOrdinato, setIsOrdinato] = useState(false);

  const queryAttuali = new URLSearchParams(location.search);
  const categoriaSlug = queryAttuali.get("categoria") || "";

  const querySenzaCategoria = new URLSearchParams(location.search);
  querySenzaCategoria.delete("categoria");
  const stringaQueryRimanenti = querySenzaCategoria.toString()
    ? `?${querySenzaCategoria.toString()}`
    : "";

  function fetchResponse(fineEndpoint, setter) {
    setIsLoading(true);
    const urlCompleto = `${endpointBase}${fineEndpoint}`;

    axios
      .get(urlCompleto)
      .then((res) => {
        setter(res.data);
      })
      .catch((err) => {
        console.error("Errore nel caricamento dati:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setIsOrdinato(query.get("order") === "alfabetico");
  }, [location.search]);

  const gestisciOrdinamento = () => {
    const query = new URLSearchParams(location.search);

    if (query.get("order") === "alfabetico") {
      query.delete("order");
    } else {
      query.set("order", "alfabetico");
    }

    navigate(`${location.pathname}?${query.toString()}`);
  };

  return (
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
