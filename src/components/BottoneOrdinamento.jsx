import { ArrowUpDown } from "lucide-react";
import { useMainContext } from "../contexts/MainContext";

function BottoneOrdinamento() {
  const { isOrdinato, gestisciOrdinamento } = useMainContext();
  return (
    <button
      onClick={gestisciOrdinamento}
      className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border shadow-sm shrink-0 ${
        isOrdinato
          ? "bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-amber-700"
      }`}
    >
      <ArrowUpDown
        className={`h-4 w-4 mr-2 ${isOrdinato ? "text-white" : "text-slate-400"}`}
      />
      {isOrdinato ? "Ordinato Alfabeticamente" : "Ordina Alfabeticamente"}
    </button>
  );
}
export default BottoneOrdinamento;
