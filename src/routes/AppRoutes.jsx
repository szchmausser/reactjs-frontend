import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import CountryRoutes from "./CountryRoutes";
import SetCount from "../pages/webapp/test/SetCount";
import Base from "../pages/base/Base";
import Register from "../pages/register/Register";
import Login from "../components/authentication/Login";
import Logout from "../components/authentication/Logout";
import Unauthorized from "../components/unauthorized/Unauthorized";
import Kanban from "../pages/kanban/Kanban";
import Calendar from "../pages/calendar/Calendar";
import Settings from "../pages/settings/Settings";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ProtectedRoutes from "../components/authorization/ProtectedRoutes";
import Forbidden from "../components/forbidden/Forbidden";
import ListRecursiveData from "../components/list-recursive-data/ListRecursiveData";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Base />} />
        <Route path="*" element={<Forbidden />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="setcount" element={<SetCount />} />

        {/* prettier-ignore */}
        <Route element={<ProtectedRoutes requiredPermission={[]} requiredRole={["role1"]} />}>
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* prettier-ignore */}
        <Route element={<ProtectedRoutes requiredPermission={[]} requiredRole={[]} />}>
          <Route path="logout" element={<Logout />} />
        </Route>

        {/* prettier-ignore */}
        <Route element={<ProtectedRoutes requiredPermission={["permission3"]} requiredRole={[]}/>}>
          <Route path="kanban" element={<Kanban />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>

        {/* prettier-ignore */}
        <Route element={<ProtectedRoutes requiredPermission={[]} requiredRole={["role1"]} />}>
          <Route path="recursive" element={<ListRecursiveData />} />
        </Route>

        {/* Inclusion de componente de subrutas CountryRoutes */}
        <Route path="countries/*" element={<CountryRoutes />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
