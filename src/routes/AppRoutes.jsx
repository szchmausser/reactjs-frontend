import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import CountryRoutes from "./CountryRoutes";
import TemplateRoutes from "./TemplateRoutes";
import SetCount from "../pages/webapp/test/SetCount";
// import Test from "../pages/webapp/countries/Test";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Cargamos el layout del sitio. Y dentro anidamos todas las rutas de la aplicacion */}
      <Route path="/" element={<Layout />}>
        {/* Grupo de rutas que forman el contenido de la plantilla. Estas rutas no van tanto orientadas
        a funcionalidades en especifico, si no mas bien que le dan forma al layout principal.
        Cargan el header, nav, footer, etc.. Segun se requiera. El contenido se incrusta en este punto
        tal como esta, como un componente, mas no como rutas de react-router-dom. Para este proposito,
        como estamos cargando las rutas del layout, funciona importar el contenido de este archivo
        como una funcion que nos trae el contenido en bruto del componente, no indica nada en el
        parametro path, ya que esta definido en cada una de las rutas a ser importadas. */}
        {TemplateRoutes()}
        {/* Grupo de rutas para paises. Esto me lo enseño ChatGPT, pero tambien se menciona en este video: https://youtu.be/qM8T4wXG2V4?t=3101 */}
        <Route path="countries/*" element={<CountryRoutes />} />

        <Route path="setcount" element={<SetCount />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
