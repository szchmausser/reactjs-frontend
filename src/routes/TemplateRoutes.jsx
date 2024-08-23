import { Route } from "react-router-dom";
import Base from "../pages/base/Base";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Settings from "../pages/settings/Settings";
import Kanban from "../pages/kanban/Kanban";
import Calendar from "../pages/calendar/Calendar";
import Register from "../pages/register/Register";
import Login from "../components/authentication/Login";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Logout from "../pages/logout/Logout";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import Forbidden from "../pages/forbidden/Forbidden";
import { isUserAuthorized } from "../utils/authUtils";
import { useSession } from "../states/stores/sessionStore";

const TemplateRoutes = () => {
  const { data: contextSessionData } = useSession();
  return (
    <>
      {/* RUTA INDEX O PRINCIPAL: Se carga un componente que se renderiza en la ruta base */}
      <Route index element={<Base />} />

      {/* RUTAS LIBRES, SIN PROTECCION */}
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Forbidden />} />

      {/* RUTAS PROTEGIDAS GRUPALMENTE: Usar el componente ProtectedRoutes para proteger multiples rutas a la vez (Emplea Outlet de react-router-dom). En este caso observamos los permisos del usuario. La misma redireccion aplica a todas las rutas */}
      <Route
        element={
          <ProtectedRoutes
            isAllowed={isUserAuthorized(
              contextSessionData,
              ["country.list"],
              ["r1"]
            )}
            redirectTo={
              contextSessionData?.login?.access_token
                ? "/unauthorized"
                : "/login"
            }
          />
        }
      >
        <Route path="kanban" element={<Kanban />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>

      {/* RUTA PROTEGIDA INDIVIDUALMENTE
        - Usar el componente ProtectedRoutes para proteger una sola ruta.
        - En este caso observamos los roles del usuario.
        - https://youtu.be/42tFXd1PdCk?t=2391
        */}
      <Route
        path="settings"
        element={
          <ProtectedRoutes
            isAllowed={isUserAuthorized(contextSessionData, [], ["role1"])} // no se requiere permiso para acceder, pero si un rol
            redirectTo={
              contextSessionData?.login?.access_token
                ? "/unauthorized"
                : "/login"
            }
          >
            <Settings />
          </ProtectedRoutes>
        }
      />

      {/* RUTAS PROTEGIDAS INDIVIDUALMENTE
        - Usar el componente ProtectedRoutes para proteger una unica ruta a la vez (Emplea children de reactjs).
        - En este caso observamos los permisos del usuario.
        - Permite redirecciones especificas a cada ruta */}
      <Route path="forgot-password" element={<ForgotPassword />} />

      <Route path="logout" element={<Logout />} />
    </>
  );
};
export default TemplateRoutes;
