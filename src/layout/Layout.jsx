import { Outlet } from "react-router-dom";
import Header from "../layout/header/Header";
import Sidebar from "../layout/sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <main className="p-4 pt-20 h-auto md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
