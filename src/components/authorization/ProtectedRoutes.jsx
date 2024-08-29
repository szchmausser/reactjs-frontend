import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../states/stores/sessionStore";
import { useUserAuthorization } from "../../hooks/useUserAuthorization";

//prettier-ignore
const ProtectedRoutesV2 = ({requiredRole = [], requiredPermission = [], children }) => {
  
  const { data: contextSessionData } = useSession();
  const isLoggedIn = contextSessionData?.login?.access_token ? true : false;
  
  const isUserAuthorizedV2 = useUserAuthorization();

  if (!isLoggedIn) {
    return <Navigate to={"/login"} replace />;
  } else if (!isUserAuthorizedV2(requiredPermission, requiredRole)) {
    return <Navigate to={"/unauthorized"} replace />;
  }

  return children || <Outlet />;
};

ProtectedRoutesV2.propTypes = {
  requiredRole: PropTypes.array,
  requiredPermission: PropTypes.array,
  isAllowed: PropTypes.bool,
  children: PropTypes.node,
};

export default ProtectedRoutesV2;
