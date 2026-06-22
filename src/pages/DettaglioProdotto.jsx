import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMainContext } from "../contexts/MainContext";
import {
  ArrowLeft,
  ShoppingBag,
  Globe,
  Info,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import SliderProdotti from "../components/SliderProdotti";

function DettaglioProdotto() {
  const { slugProdotto } = useParams();
  const navigate = useNavigate();
  const { fetchResponse } = useMainContext();

  const [prodotto, setProdotto] = useState({});
  const [viniCorrelati, setViniCorrelati] = useState([]);

  const fineEndpointDettaglio = `api/prodotti/${slugProdotto}`;
  const fineEndpointViniCorrelati = `api/vini/prodotto/${slugProdotto}`;

  useEffect(() => {
    fetchResponse(fineEndpointDettaglio, setProdotto);
    fetchResponse(fineEndpointViniCorrelati, setViniCorrelati);
  }, [slugProdotto]);

  const { nome, descrizione, urlImmagine, linkStore } = prodotto;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      <header className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden shadow-sm">
        <img
          src={urlImmagine}
          alt={nome}
          className="absolute inset-0 w-full h-full object-cover transform scale-100 transition-transform duration-700 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/20 backdrop-blur-[1.5px]" />

        <div className="absolute top-6 left-4 md:left-8 z-20 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white/90 hover:bg-white hover:text-amber-800 backdrop-blur-sm transition-all duration-200 shadow-sm border border-slate-200/50 hover:border-amber-200/50 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Indietro</span>
          </button>

          <Link
            to="/prodotti/all"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-amber-900 bg-amber-50/90 hover:bg-amber-100 hover:text-amber-950 backdrop-blur-sm transition-all duration-200 shadow-sm border border-amber-200/40 active:scale-95"
          >
            <LayoutGrid className="h-4 w-4 text-amber-700" />
            <span>Tutti i prodotti</span>
          </Link>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl px-6 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold tracking-widest uppercase text-xs md:text-sm drop-shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Eccellenza Gastronomica Italiana
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight drop-shadow-md max-w-3xl mx-auto">
            {nome}
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 -mt-20 relative z-20 mb-20">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 aspect-square rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center p-6 group shadow-inner">
            <img
              src={urlImmagine}
              alt={nome}
              className="max-h-full max-w-full object-contain rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="md:col-span-7 space-y-6 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 text-slate-800 font-serif font-bold text-xl md:text-2xl border-b border-slate-100 pb-4">
              <Info className="h-5 w-5 text-amber-600 shrink-0" />
              <h2>Informazioni </h2>
            </div>

            <p className="text-base text-slate-600 font-light leading-relaxed tracking-wide">
              {descrizione}
            </p>

            <div className="pt-4 border-t border-slate-50">
              <a
                href={linkStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-amber-600/10 hover:shadow-lg hover:shadow-amber-600/20 gap-3 group"
              >
                <ShoppingBag className="h-4 w-4 text-amber-200" />
                <span>Acquista nello Store Ufficiale</span>
                <Globe className="h-4 w-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {viniCorrelati && viniCorrelati.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6 border-t border-slate-200/60">
          <SliderProdotti
            listaProdotti={viniCorrelati}
            titoloSezione="Vini Correlati"
            descrizioneSezione="I migliori vini da abbinare a questo prodotto"
            scrittaLink="Vedi tutti i vini"
            urlLink="/vini/all"
          />
        </section>
      )}
    </div>
  );
}

export default DettaglioProdotto;
