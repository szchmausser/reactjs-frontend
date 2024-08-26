import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <main className="md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
