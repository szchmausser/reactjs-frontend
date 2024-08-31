import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useSession } from "./states/stores/sessionStore";
import { useLocation } from "react-router-dom";

function App() {
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

  return <AppRoutes />;
}

export default App;
