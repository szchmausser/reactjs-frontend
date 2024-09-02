// src/hooks/useHandleLogin.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../states/stores/sessionStore";

const useHandleLogin = (
  loginMutation,
  rolesQuery,
  permissionsQuery,
  companyId,
  remember
) => {
  const navigate = useNavigate();
  const { setData: setSessionData } = useSession();

  useEffect(() => {
    if (
      loginMutation.isSuccess &&
      !rolesQuery.isFetching &&
      !permissionsQuery.isFetching
    ) {
      const authData = {
        login: {
          access_token: loginMutation.data.data.data.access_token,
          token_type: loginMutation.data.data.data.token_type,
          expires_at: loginMutation.data.data.data.expires_at,
        },
        user: loginMutation.data.data.data.user,
        company: {
          company_id: companyId,
        },
        roles: rolesQuery.data?.data.data.roles || [],
        permissions: permissionsQuery.data?.data.data.permissions || [],
        remember: remember,
      };

      setSessionData(authData);

      if (remember === true) {
        localStorage.setItem("auth", JSON.stringify(authData));
      }

      navigate("/");
    }
  }, [
    loginMutation.isSuccess,
    rolesQuery.isFetching,
    permissionsQuery.isFetching,
    loginMutation.data,
    permissionsQuery.data,
    rolesQuery.data,
    setSessionData,
    companyId,
    remember,
    navigate,
  ]);
};

export default useHandleLogin;
