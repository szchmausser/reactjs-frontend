import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import CountryRoutes from "./CountryRoutes";
import SetCount from "../pages/webapp/test/SetCount";
import Base from "../pages/base/Base";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import { isUserAuthorized } from "../utils/authUtils";
import { useSession } from "../states/stores/sessionStore";
import Register from "../pages/register/Register";
import Login from "../components/authentication/Login";
import Logout from "../components/authentication/Logout";
import Unauthorized from "../pages/unauthorized/Unauthorized";
import Forbidden from "../pages/forbidden/Forbidden";
import Kanban from "../pages/kanban/Kanban";
import Calendar from "../pages/calendar/Calendar";
import Settings from "../pages/settings/Settings";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";

const AppRoutes = () => {
  const { data: contextSessionData } = useSession();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Base />} />
        <Route path="*" element={<Forbidden />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="setcount" element={<SetCount />} />

        {/* Ruta individual privada*/}
        {/* prettier-ignore */}
        <Route path="settings" element={
          <ProtectedRoutes isAllowed={isUserAuthorized(contextSessionData, [], ["role1"])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}
        >
            <Settings />
          </ProtectedRoutes>
        }/>

        {/* Grupo de rutas privadas*/}
        {/* prettier-ignore */}
        <Route element={
          <ProtectedRoutes isAllowed={isUserAuthorized(contextSessionData, [], [])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}/>}
        >
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* prettier-ignore */}
        <Route element={
          <ProtectedRoutes isAllowed={isUserAuthorized(contextSessionData, ["country.list"], ["r1"])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}/>}
        >
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>

        {/* Inclusion de componente de subrutas CountryRoutes */}
        <Route path="countries/*" element={<CountryRoutes />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;

// A - SOBRE OPCIONES DE AUTENTICACION:

// A1 - Definicion de una ruta privada individual:
// <Route path="settings" element={
//   <ProtectedRoutes
//     isAllowed={isUserAuthorized(contextSessionData, [], ["role1"])}
//     redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}
//   >
//     <Settings />
//     </ProtectedRoutes>
// }/>

// A2 - Definicion de un grupo privado de rutas
// <Route
//  element={
//    <ProtectedRoutes
//      isAllowed={isUserAuthorized(contextSessionData, [], [])}
//      redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}
//    />
//  }
// >
//  <Route path="/forgot-password" element={<ForgotPassword />} />
//  <Route path="/logout" element={<Logout />} />
// </Route>

// B - SOBRE OPCIONES DE AUTORIZACION:

// B1 - No se requiere ningun rol tampoco algun permiso
// isUserAuthorized(contextSessionData, [], []

// B2 - Se requiere un permiso, ningun rol
// isUserAuthorized(contextSessionData, ["permission1"], []

// B3 - No se requiere ningun permiso, si un rol
// isUserAuthorized(contextSessionData, [], ["role1"]

// B4 - Se requiere alguno de estos roles o permisos, con cumplir alguno, se concede el acceso
// isUserAuthorized(contextSessionData, [permission1], ["role1"]

// C - SOBRE DEFINIR RUTAS EN OTRO COMPONENTE:

// C1 - La definicion dentro de este archivo:
// <Route path="countries/*" element={<CountryRoutes />} />

// C2 - La definicion dentro de otro componente:
// const CountryRoutes = () => {
// return (
// <Routes>
//   <Route index element={<ElComponente />} />
//   <Route path="/otraruta" element={<OtroComponente />} />
// </Routes>
