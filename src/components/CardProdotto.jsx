import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function CardProdotto({ prodotto }) {
  return (
    <Link
      to={`/prodotti/dettaglio/${prodotto.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
        <img
          src={prodotto.urlImmagine}
          alt={prodotto.nome}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <h3 className="font-serif font-bold text-lg text-slate-800 group-hover:text-amber-700 transition-colors line-clamp-2 min-h-[3.5rem] leading-snug">
            {prodotto.nome}
          </h3>
        </div>

        <div className="pt-2 border-t border-slate-50 flex items-center justify-between text-xs text-amber-700 font-medium">
          <span>Scopri di più</span>
          <ChevronRight className="h-3 w-3 transform group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
export default CardProdotto;
