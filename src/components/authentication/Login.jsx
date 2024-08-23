import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  fetchUserRoles,
  fetchUserPermissions,
} from "./loginEndpoints";

import { useSession } from "../../states/stores/sessionStore";

const Login = () => {
  const { setData } = useSession();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(null);

  const handleChangeOnField = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  const login = async (credentials) => {
    // Primero, hacemos la petición de login. Desde src/components/authentication/loginEndpoints.js -> loginUser(), podemos cambiar a llamar el metodo doLogin() o failLogin()
    const loginData = await loginUser(credentials);

    // Luego, obtenemos los roles y permisos con la info del usuario y compañía
    const rolesData = await fetchUserRoles(
      loginData.data.data.user.id,
      credentials.company,
      loginData.data.data.access_token
    );

    const permissionsData = await fetchUserPermissions(
      loginData.data.data.user.id,
      credentials.company,
      loginData.data.data.access_token
    );

    // Armamos el estado global de autenticación
    const authData = {
      login: {
        access_token: loginData.data.data.access_token,
        token_type: loginData.data.data.token_type,
        expires_at: loginData.data.data.expires_at,
      },
      user: loginData.data.data.user,
      company: {
        company_id: credentials.company,
      },
      roles: rolesData.data.data.roles,
      permissions: permissionsData.data.data.permissions,
    };

    // Guardamos el estado global
    setData(authData);

    // console.log("authData: ", authData);

    // Tiene que retornar datos para el metodo onSuccess de la mutacion tenga disponible estos datos
    return authData;
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // onSuccess: (responseData) => {
      // Podemos acceder a los datos que retornamos desde la funcion que ejecutamos con mutationFn: login
      // console.log("responseData: ", responseData);

      // Podemos almacenar los datos en localStorage si es necesario
      // localStorage.setItem("auth", JSON.stringify(responseData));

      // Redireccionamos
      navigate("/countries");
    },
  });

  if (loginMutation.isPending) return <div>Enviando...</div>;
  if (loginMutation.isError)
    return (
      <div>
        Ocurrio un error: {loginMutation.error.message}{" "}
        {loginMutation.error.response?.data?.data?.errors}
      </div>
    );

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
