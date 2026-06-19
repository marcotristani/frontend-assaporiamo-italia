// import outlet
import { Outlet } from "react-router-dom";
//importo
import { useMainContext } from "../contexts/MainContext";

import "../styles/LoaderStyle.css";

//importo componente loader
import Loader from "../components/Loader";

function DefaultLayout() {
  //definisco isloading
  const { isLoading } = useMainContext();
  return (
    <>
      <h1>sono l'header del layout principale</h1>
      <main>
        <Outlet />
        {isLoading && <Loader />}
      </main>
      <h4>sono il footer del layout principale</h4>
    </>
  );
}

export default DefaultLayout;
