import CountriesList from "../pages/webapp/countries/CountriesList";
import CountryCreate from "../pages/webapp/countries/CountryCreate";
import CountryShow from "../pages/webapp/countries/CountryShow";
import CountryEdit from "../pages/webapp/countries/CountryEdit";
import CountryDelete from "../pages/webapp/countries/CountryDelete";
import ProtectedRoutes from "../components/authorization/ProtectedRoutes";

const CountryRoutes = [
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
];

export default CountryRoutes;
