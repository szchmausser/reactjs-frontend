import { HiOutlineArrowRight } from "react-icons/hi";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Checkbox } from "flowbite-react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useMutation, useQuery } from "@tanstack/react-query";
import Error from "../error/Error";
import Loading from "../loading/Loading";
import { useSession } from "../../states/stores/sessionStore";
//prettier-ignore
import {loginUser, fetchUserRoles, fetchUserPermissions} from "./loginEndpoints";
import { z } from "zod";

const Login = () => {
  const navigate = useNavigate();
  const { data, setData } = useSession();
  const [ultimaRuta, setUltimaRuta] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const [loginData, setLoginData] = useState({
    company: "",
    email: "",
    password: "",
    remember: false,
  });
  // Estado almacenar errores de validación producidos Zod y poder manejarlos en la UI

  // Define el esquema de validación para la libreria Zod
  const loginSchema = z.object({
    company: z.number().int().positive(),
    email: z.string().email(),
    password: z.string(),
    remember: z.boolean(),
  });

  useEffect(() => {
    async function readLocalStorage() {
      const route = await localStorage.getItem("lastRoute");
      console.log("route", route);
      if (route) {
        setUltimaRuta(route);
      }
    }
    readLocalStorage();
    console.log("ultimaRuta", ultimaRuta);
  }, [ultimaRuta]);

  useEffect(() => {
    data?.login?.access_token && navigate(ultimaRuta);
  }, [navigate, ultimaRuta, data?.login?.access_token]);

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
  const remember = loginData?.remember;

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
        remember: loginData.remember,
      };

      setData(authData);

      if (remember === true) {
        localStorage.setItem("auth", JSON.stringify(authData));
      }

      navigate("/");
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
    remember,
  ]);

  // Función separada para manejar los errores de Zod
  const handleZodErrors = (zodError) => {
    // Crea un objeto para almacenar los errores de validación
    const validationErrorsObject = {};

    // Itera sobre cada error en el objeto ZodError
    zodError.errors.forEach((individualError) => {
      // Obtiene el nombre del campo que causó el error
      const fieldName = individualError.path[0];

      // Obtiene el mensaje de error para este campo
      const errorMessage = individualError.message;

      // Almacena el mensaje de error en el objeto de errores de validación
      validationErrorsObject[fieldName] = errorMessage;
    });

    // Imprime los errores en la consola para depuración
    // console.log("Validation errors:", validationErrorsObject);

    // Actualiza el estado con los errores de validación
    setValidationErrors(validationErrorsObject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationErrors({}); // Resetea los errores si todo es válido

    // Intentamos validar los datos con el esquema de Zod
    try {
      const validatedData = loginSchema.parse(loginData);

      // Si los datos son válidos, ejecutamos la mutación de inicio de sesión
      loginMutation.mutate(validatedData);
    } catch (error) {
      // Si ocurre un error durante la validación, lo manejamos aquí
      if (error instanceof z.ZodError) {
        // Llama a una función separada para manejar los errores de Zod
        handleZodErrors(error);
      } else {
        // Si no es un error de Zod, lo registramos en la consola
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleChangeOnField = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: name === "company" ? parseInt(value, 10) || "" : value, //manejar el caso en que company no sea un número válido:
    }));
  };

  const isSubmitDisabled = useMemo(() => {
    return (
      loginMutation.isPending ||
      !loginData.company ||
      !loginData.email ||
      !loginData.password
    );
  }, [loginMutation.isPending, loginData]);

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
          <div className="overflow-auto mx-auto w-3/4 md:w-1/2 lg:w-1/3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <h1 className="flex justify-center mb-6 w-full text-4xl text-gray-400">
                Login
              </h1>
              {/* <div className="block mb-2">
            <Label
              htmlFor="company"
              value="Your company"
              color={validationErrors?.company ? "failure" : ""}
            />
          </div> */}
              <TextInput
                placeholder="Your company_id"
                id="company"
                name="company"
                type="number"
                icon={FaRegBuilding}
                color={validationErrors?.company ? "failure" : ""}
                onChange={handleChangeOnField}
                helperText={
                  <>
                    {validationErrors.company && (
                      <span className="font-medium">Oops! </span>
                    )}
                    {validationErrors.company}
                  </>
                }
                required
              />

              {/* <div className="block mb-2">
            <Label
              htmlFor="email"
              value="Your email"
              color={validationErrors?.email ? "failure" : ""}
            />
          </div> */}
              <TextInput
                id="email"
                name="email"
                type="email"
                // placeholder="user@email.tld"
                placeholder="Your email"
                icon={MdOutlineAlternateEmail}
                color={validationErrors?.email ? "failure" : ""}
                onChange={handleChangeOnField}
                helperText={
                  <>
                    {validationErrors.email && (
                      <span className="font-medium">Oops! </span>
                    )}
                    {validationErrors.email}
                  </>
                }
                required
              />

              {/* <div className="block mb-2">
            <Label
              htmlFor="password"
              value="Your password"
              color={validationErrors?.password ? "failure" : ""}
            />
          </div> */}
              <TextInput
                // placeholder="!@#$%^&*?"
                placeholder="Your password"
                id="password"
                name="password"
                type="password"
                icon={RiLockPasswordLine}
                color={validationErrors?.password ? "failure" : ""}
                onChange={handleChangeOnField}
                helperText={
                  <>
                    {validationErrors.password && (
                      <span className="font-medium">Oops! </span>
                    )}
                    {validationErrors.password}
                  </>
                }
                required
              />

              <div className="flex justify-center items-center">
                <Checkbox
                  id="remember"
                  name="remember"
                  onChange={(event) =>
                    setLoginData((prevData) => ({
                      ...prevData,
                      remember: event.target.checked,
                    }))
                  }
                />
                <Label htmlFor="remember">
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitDisabled}
                className="mt-2 max-w-[200px] mx-auto"
              >
                {loginMutation.isPending ? "Logging in..." : "Submit"}
                <HiOutlineArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <div className="inline-flex justify-center mt-3">
                <Link to="/register" className="flex">
                  <span className="text-sm text-gray-600">
                    Register account
                  </span>
                </Link>

                <div className="flex items-center text-sm text-center text-gray-600">
                  <span className="mx-2 text-sm text-gray-600">|</span>
                </div>

                <Link to="/forgot-password" className="flex justify-end">
                  <span className="text-sm text-gray-600">
                    Recover password
                  </span>
                </Link>
              </div>

              {/* Loading */}
              {(loginMutation.isPending ||
                rolesQuery.isFetching ||
                permissionsQuery.isFetching) && (
                <div className="mt-4 w-full">
                  <Loading
                    color={"blue"}
                    message={"Wait a moment, you are login..."}
                    className="w-full"
                  />
                </div>
              )}

              {/* Error */}
              {loginMutation.isError && (
                <div className="mt-4 w-full">
                  <Error message={loginMutation.error} className="w-full" />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
