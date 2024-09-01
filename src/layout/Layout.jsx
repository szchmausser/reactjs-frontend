import { Outlet, useLocation } from "react-router-dom";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";
import { useSession } from "../states/stores/sessionStore";
import { useEffect } from "react";

const Layout = () => {
  const { setData: setLoginData } = useSession();
  const location = useLocation();

  //Login persistente, restablecer estado de login desde el localStorage
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      setLoginData(auth);
    }
  }, [setLoginData]);

  //Probando: Mantener en localstorage la ultima ruta visitada. Esto para tratar de redirigir aqui al refrescar el navegador
  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/Logout") {
      localStorage.setItem("lastRoute", location.pathname);
    }
  }, [location]);
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <main className="md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
