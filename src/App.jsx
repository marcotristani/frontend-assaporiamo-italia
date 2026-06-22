import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { MainProvider } from "./contexts/MainContext";
import DefaultLayout from "./layouts/DefaultLayout";
import RegioneDetail from "./pages/RegioneDetail";
import ProdottiRegione from "./pages/ProdottiRegione";
import ListaProdottiLayout from "./layouts/ListaProdottiLayout";

export default function App() {
  return (
    <BrowserRouter>
      <MainProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/regione/:slugRegione" element={<RegioneDetail />} />
            <Route element={<ListaProdottiLayout />}>
              <Route
                path="/prodotti/regione/:slugRegione"
                element={<ProdottiRegione />}
              />
            </Route>
          </Route>
        </Routes>
      </MainProvider>
    </BrowserRouter>
  );
}
