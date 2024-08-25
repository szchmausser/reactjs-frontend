import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ isAllowed, children, redirectTo = "/" }) => {
  // Si isAllowed = false, redirige a la ruta indicada en redirectTo
  // Si isAllowed = true, devuelve el children o el outlet depende de cual de los 2 se cumpla

  // Esta logica garantiza/permite proteger rutas individuales, donde en este caso se hace uso del outlet,
  // o tambien rutas anidadas en las cuales se aplica children
  // https://youtu.be/42tFXd1PdCk?list=PLG7RuCaZf3UuJxcjyh2QKpl2LciQqvg3Z&t=1201

  return !isAllowed ? <Navigate to={redirectTo} /> : children || <Outlet />;
};

ProtectedRoutes.propTypes = {
  isAllowed: PropTypes.bool,
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export default ProtectedRoutes;
