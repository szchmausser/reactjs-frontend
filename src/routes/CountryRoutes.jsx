import { Route, Routes } from "react-router-dom";
import CountriesList from "../pages/webapp/countries/CountriesList";
import CountryCreate from "../pages/webapp/countries/CountryCreate";
import CountryShow from "../pages/webapp/countries/CountryShow";
import CountryEdit from "../pages/webapp/countries/CountryEdit";
import CountryDelete from "../pages/webapp/countries/CountryDelete";
import { useSession } from "../states/stores/sessionStore";
import { useUserAuthorization } from "../hooks/useUserAuthorization";
import ProtectedRoutes from "../components/authorization/ProtectedRoutes";

const CountryRoutes = () => {
  const { data: contextSessionData } = useSession();
  const isUserAuthorized = useUserAuthorization();

  return (
    <Routes>
      {/* prettier-ignore */}
      <Route index element={
        <ProtectedRoutes isAllowed={isUserAuthorized(["permission1"], ["role1"])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}>
          <CountriesList />
        </ProtectedRoutes>}
      />

      {/* prettier-ignore */}
      <Route path="create" element={
        <ProtectedRoutes isAllowed={isUserAuthorized(["country.create"], [])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}>
          <CountryCreate />
        </ProtectedRoutes>}
      />

      {/* prettier-ignore */}
      <Route path="show/:id" element={
        <ProtectedRoutes isAllowed={isUserAuthorized([], [])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}>
          <CountryShow />
        </ProtectedRoutes>}
      />

      {/* prettier-ignore */}
      <Route path="edit/:id" element={
        <ProtectedRoutes isAllowed={isUserAuthorized([], [])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}>
          <CountryEdit />
        </ProtectedRoutes>}
      />

      {/* prettier-ignore */}
      <Route path="delete/:id" element={
        <ProtectedRoutes isAllowed={isUserAuthorized([], [])} redirectTo={contextSessionData?.login?.access_token ? "/unauthorized" : "/login"}>
          <CountryDelete />
        </ProtectedRoutes>}
      />
    </Routes>
  );
};

export default CountryRoutes;
