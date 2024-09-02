// src/hooks/useLastRoute.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useLastRoute = (sessionData) => {
  const [ultimaRuta, setUltimaRuta] = useState(null);
  const navigate = useNavigate();

  // Efectos para redireccionar al usuario tras un refresco de página: Esta funcionalidad es necesaria porque las rutas
  // privadas requieren autenticación y ciertos roles o permisos. Al refrescar la página, los datos de la sesión no están
  // disponibles en el estado global de la sesion, lo que provoca que el usuario sea redirigido a la ruta de inicio de sesión.
  // Por lo tanto, se implementan estos efectos para recuperar la última ruta visitada y redirigir al usuario a ella.
  // Primero, un efecto se ejecuta al renderizar el componente, leyendo la última ruta del localStorage y almacenándola
  // en el estado. Luego, otro efecto verifica si hay un token en el estado global de la sesion; si existe, redirige al
  // usuario a la última ruta guardada.
  useEffect(() => {
    const readLocalStorage = () => {
      const route = localStorage.getItem("lastRoute");
      if (route) {
        setUltimaRuta(route);
      }
    };
    readLocalStorage();
  }, []);

  useEffect(() => {
    if (sessionData?.login?.access_token && ultimaRuta) {
      navigate(ultimaRuta);
    }
  }, [navigate, ultimaRuta, sessionData?.login?.access_token]);
};

export default useLastRoute;
