import React from "react";
import "../styles/ScrollbarStyle.css";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function SliderProdotti({
  listaProdotti,
  titoloSezione,
  descrizioneSezione,
  scrittaLink,
  urlLink,
}) {
  return (
    <section className="bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-orange-100/50 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-orange-100 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-800 capitalize">
            {titoloSezione}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{descrizioneSezione}</p>
        </div>
        <Link
          to={urlLink}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 transition-colors duration-200 shadow-sm hover:shadow group"
        >
          {scrittaLink}
          <ChevronRight className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="w-full">
        <div className="w-full max-w-6xl mx-auto py-8">
          <div className="flex -ml-4 justify-start overflow-x-auto pb-6 pt-2 px-4 md:px-0 scrollbar-stile scroll-smooth snap-x snap-mandatory">
            {listaProdotti.map((prodotto) => {
              return (
                <div
                  key={prodotto.id}
                  className="flex-none pl-4 w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 min-w-[250px] max-w-[300px] snap-start scroll-mt-6"
                >
                  <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm h-80 flex flex-col transition-all duration-300 hover:shadow-md">
                    <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 mb-4 flex items-center justify-center relative flex-shrink-0">
                      <img
                        src={prodotto.urlImmagine}
                        alt={prodotto.nome}
                        className="w-full h-full object-cover pointer-events-none"
                      />
                    </div>

                    <div className="text-center mt-auto flex-grow flex items-center justify-center px-2">
                      <h3 className="font-bold text-base text-slate-800 line-clamp-2 leading-snug">
                        {prodotto.nome}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SliderProdotti;
