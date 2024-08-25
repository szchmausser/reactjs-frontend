import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "../../states/stores/sessionStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import { Button } from "flowbite-react";
import {
  loginUser,
  fetchUserRoles,
  fetchUserPermissions,
} from "./loginEndpoints";
import Error from "../error/Error";

const Login = () => {
  const { setData } = useSession();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(null);

  // Sobre peticiones dependientes:
  // https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries

  // Llamamos a la peticion inicial
  const loginMutation = useMutation({
    mutationFn: loginUser,
  });

  // De loginMutation, extraemos algunos valores de la respuesta para reusarlos y hacer
  // mas legible el codigo de las peticiones dependientes
  const userId = loginMutation.data?.data.data.user.id;
  const companyId = loginData?.company;
  const accessToken = loginMutation.data?.data.data.access_token;

  // Llamamos a la peticion dependiente 1
  const rolesQuery = useQuery({
    queryKey: ["roles", userId, companyId, accessToken],
    queryFn: () => fetchUserRoles({ userId, companyId, accessToken }),
    enabled: !!userId,
  });

  // Llamamos a la peticion dependiente 2
  const permissionsQuery = useQuery({
    queryKey: ["permissions", userId, companyId, accessToken],
    queryFn: () => fetchUserPermissions({ userId, companyId, accessToken }),
    enabled: !!userId,
  });

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
          company_id: loginData.company,
        },
        roles: rolesQuery.data?.data.data.roles || [],
        permissions: permissionsQuery.data?.data.data.permissions || [],
      };

      setData(authData);
      navigate("/countries");
    }
  }, [
    loginMutation.isSuccess,
    rolesQuery.isFetching,
    permissionsQuery.isFetching,
    loginData,
    loginMutation.data,
    permissionsQuery.data,
    rolesQuery.data,
    navigate,
    setData,
  ]);

  const handleChangeOnField = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  if (
    loginMutation.isPending ||
    rolesQuery.isFetching ||
    permissionsQuery.isFetching
  ) {
    return (
      <Loading color={"gray"} message={"Wait a moment, you are login..."} />
    );
  }

  if (loginMutation.isError) return <Error message={loginMutation.error} />;

  return (
    <>
      <form onSubmit={handleSubmit} className="inline-flex gap-1">
        <input
          id="company"
          name="company"
          type="number"
          placeholder="Company ID"
          onChange={handleChangeOnField}
        />
        <input
          id="email"
          name="email"
          type="email"
          placeholder="User Email"
          onChange={handleChangeOnField}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="User password"
          onChange={handleChangeOnField}
        />
        <Button color="dark" size="sm" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
