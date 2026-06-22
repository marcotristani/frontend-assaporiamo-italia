import { Link, useParams } from "react-router-dom";
import SliderProdotti from "../components/SliderProdotti";
import axios from "axios";
import { useMainContext } from "../contexts/MainContext";
import { useState } from "react";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

function RegioneDetail() {
  const { slugRegione } = useParams();

  const { fetchResponse } = useMainContext();

  const endpointRegioneDetail = `api/regioni/${slugRegione}`;
  const [regioneDetail, setRegioneDetail] = useState({});

  const endpointProdottiCorrelati = `api/prodotti/regione/${slugRegione}`;
  const [prodottiTipici, setProdottiTipici] = useState([]);

  const endpointViniCorrelati = `api/vini/regione/${slugRegione}`;
  const [vini, setVini] = useState([]);

  //eseguo le chiamate che mi servono per recuperare i dati per popolare questa pagina
  useEffect(() => {
    fetchResponse(endpointRegioneDetail, setRegioneDetail);
    fetchResponse(endpointProdottiCorrelati, setProdottiTipici);
    fetchResponse(endpointViniCorrelati, setVini);
  }, []);

  const { nome, descrizione, urlImmagine } = regioneDetail;
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-slate-100 pb-16 relative overflow-hidden">
      <header className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden shadow-lg">
        <img
          src={urlImmagine}
          alt={`Panorama della regione ${nome}`}
          className="absolute inset-0 w-full h-full object-cover transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center text-white max-w-4xl px-6 md:px-12 space-y-4">
          <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm md:text-base">
            Assapora la Regione
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight drop-shadow-md">
            {nome}
          </h1>
          <p className="text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-2xl mx-auto drop-shadow">
            {descrizione}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-12 md:mt-16 space-y-16">
        <SliderProdotti
          listaProdotti={prodottiTipici}
          titoloSezione="Prodotti Tipici"
          descrizioneSezione="Le eccellenze gastronomiche di questa terra."
          scrittaLink="Vedi tutti i prodotti"
          urlLink={`/prodotti/regione/${slugRegione}`}
        />

        <SliderProdotti
          listaProdotti={prodottiTipici}
          titoloSezione="I Vini"
          descrizioneSezione="Vitigni storici e cantine d'eccellenza."
          scrittaLink="Vedi tutti i vini"
          urlLink={`/vini/regione/${slugRegione}`}
        />
      </main>
    </div>
  );
}

export default RegioneDetail;
