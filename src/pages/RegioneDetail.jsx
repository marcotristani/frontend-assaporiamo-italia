import { useParams } from "react-router-dom";

function RegioneDetail() {
  const { slugRegione } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-slate-100 p-6 md:p-12 relative overflow-hidden">
      <h1>Regione {slugRegione}</h1>
    </div>
  );
}

export default RegioneDetail;
