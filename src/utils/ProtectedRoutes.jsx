import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ isAllowed, children, redirectTo = "/" }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoutes.propTypes = {
  isAllowed: PropTypes.bool,
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export default ProtectedRoutes;
