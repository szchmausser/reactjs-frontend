import Base from "../pages/base/Base";
import Forbidden from "../components/forbidden/Forbidden";
import Register from "../pages/register/Register";
import Login from "../components/authentication/Login";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import Unauthorized from "../components/unauthorized/Unauthorized";
import SetCount from "../pages/webapp/test/SetCount";
import ProtectedRoutes from "../components/authorization/ProtectedRoutes";
import Logout from "../components/authentication/Logout";
import Settings from "../pages/settings/Settings";
import ListRecursiveData from "../components/list-recursive-data/ListRecursiveData";
import Kanban from "../pages/kanban/Kanban";
import Calendar from "../pages/calendar/Calendar";
import CountryTable from "../pages/webapp/countries/CountryTable";

const AppRoutes = [
  //Rutas publicas, sin autenticación, ni roles o permisos requeridos
  { index: true, element: <Base /> },
  { path: "*", element: <Forbidden /> },
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "unauthorized", element: <Unauthorized /> },
  { path: "setcount", element: <SetCount /> },

  //Para esta ruta no se especifican roles ni permisos requeridos. Solo requiere que el usuario este logueado para accederlas.
  {
    element: <ProtectedRoutes requiredPermission={[]} requiredRole={[]} />,
    children: [{ path: "logout", element: <Logout /> }],
  },

  // Grupo de rutas sin path determinado. Requieren autenticacion + permisos y/o roles.
  // La autenticacion y autorizacion es comun a todas las rutas internas.
  // En el children se definen las rutas de forma individual.
  {
    element: (
      <ProtectedRoutes requiredPermission={[]} requiredRole={["role1"]} />
    ),
    children: [
      { path: "settings", element: <Settings /> },
      { path: "recursive", element: <ListRecursiveData /> },
      { path: "tanstack-table", element: <CountryTable /> },
    ],
  },
  {
    element: (
      <ProtectedRoutes requiredPermission={["permission3"]} requiredRole={[]} />
    ),
    children: [
      { path: "kanban", element: <Kanban /> },
      { path: "calendar", element: <Calendar /> },
    ],
  },
];

export default AppRoutes;
