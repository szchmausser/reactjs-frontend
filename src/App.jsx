import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";
import ProtectedRoutes from "./components/authorization/ProtectedRoutes";
import Forbidden from "./components/forbidden/Forbidden";
import ListRecursiveData from "./components/list-recursive-data/ListRecursiveData";
import Unauthorized from "./components/unauthorized/Unauthorized";
import Layout from "./layout/Layout";
import Base from "./pages/base/Base";
import Calendar from "./pages/calendar/Calendar";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import Kanban from "./pages/kanban/Kanban";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import CountriesList from "./pages/webapp/countries/CountriesList";
import CountryCreate from "./pages/webapp/countries/CountryCreate";
import CountryDelete from "./pages/webapp/countries/CountryDelete";
import CountryEdit from "./pages/webapp/countries/CountryEdit";
import CountryShow from "./pages/webapp/countries/CountryShow";
import SetCount from "./pages/webapp/test/SetCount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
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
        ],
      },
      {
        element: (
          <ProtectedRoutes
            requiredPermission={["permission3"]}
            requiredRole={[]}
          />
        ),
        children: [
          { path: "kanban", element: <Kanban /> },
          { path: "calendar", element: <Calendar /> },
        ],
      },

      // Grupo de rutas para el path "/countries".
      // En cada una de las rutas internas se requieren autenticacion + permisos y/o roles de forma individualizada.
      // En el children se definen las subrutas de forma individual.
      {
        path: "countries",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
                <CountriesList />
              </ProtectedRoutes>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
                <CountryCreate />
              </ProtectedRoutes>
            ),
          },
          {
            path: "show/:id",
            element: (
              <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
                <CountryShow />
              </ProtectedRoutes>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
                <CountryEdit />
              </ProtectedRoutes>
            ),
          },
          {
            path: "delete/:id",
            element: (
              <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
                <CountryDelete />
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
