import { Route, Routes } from "react-router-dom";
import CountriesList from "../pages/webapp/countries/CountriesList";
import CountryCreate from "../pages/webapp/countries/CountryCreate";
import CountryShow from "../pages/webapp/countries/CountryShow";
import CountryEdit from "../pages/webapp/countries/CountryEdit";
import CountryDelete from "../pages/webapp/countries/CountryDelete";
import ProtectedRoutes from "../components/authorization/ProtectedRoutes";

const CountryRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
            <CountriesList />
          </ProtectedRoutes>
        }
      />

      <Route
        path="create"
        element={
          <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
            <CountryCreate />
          </ProtectedRoutes>
        }
      />

      <Route
        path="show/:id"
        element={
          <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
            <CountryShow />
          </ProtectedRoutes>
        }
      />

      <Route
        path="edit/:id"
        element={
          <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
            <CountryEdit />
          </ProtectedRoutes>
        }
      />

      <Route
        path="delete/:id"
        element={
          <ProtectedRoutes requiredPermission={[]} requiredRole={[]}>
            <CountryDelete />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default CountryRoutes;
