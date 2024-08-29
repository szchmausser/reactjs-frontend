import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../states/stores/sessionStore";

const Logout = () => {
  const navigate = useNavigate();
  const { setData, resetData } = useSession();

  useEffect(() => {
    const performLogout = async () => {
      // Aquí iría la lógica para hacer logout en el backend si es necesario

      // Limpiamos completamente el estado de sesión
      setData({
        login: null,
        user: null,
        company: null,
        roles: [],
        permissions: [],
      });

      // Resetear completamente el estado
      resetData();

      // Limpiamos el localStorage
      localStorage.clear();

      // Redirigir al usuario a la página de login
      navigate("/login");
    };

    performLogout();
  }, [setData, resetData, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
