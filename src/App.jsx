import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import CountryRoutes from "./routes/CountryRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...AppRoutes, // Importamos las rutas principales
      ...CountryRoutes, // Importamos las rutas de países
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
