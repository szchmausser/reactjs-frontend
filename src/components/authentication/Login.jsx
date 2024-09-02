import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { FaRegBuilding } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useSession } from "../../states/stores/sessionStore";
import Error from "../error/Error";
import Loading from "../loading/Loading";
import useLastRoute from "../../hooks/useLastRoute";
//prettier-ignore
import { fetchUserPermissions, fetchUserRoles, loginUser } from "./loginEndpoints";
import useHandleLogin from "../../hooks/useHandleLogin";

const Login = () => {
  const { data: sessionData } = useSession();

  // Importar hook que contiene los efectos para redireccionar al usuario tras un refresco de página
  useLastRoute(sessionData);

  // Sobre peticiones dependientes: https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries
  // Llamamos a la peticion inicial
  const loginMutation = useMutation({
    mutationFn: loginUser,
  });

  // Define el esquema de validación para la libreria Zod
  const loginSchema = z.object({
    company: z.number().int().positive(),
    email: z.string().email(),
    password: z.string(),
    remember: z.boolean(),
  });

  // Inicializar react-hook-form con el schema de Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      company: "",
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (formData) => {
    loginMutation.mutate(formData);
  };

  // De loginMutation, extraemos algunos valores de la respuesta para reusarlos y hacer mas legible el codigo de las peticiones dependientes
  const userId = loginMutation.data?.data.data.user.id;
  const companyId = getValues("company"); //Acceder a los valores del formulario con la funcion getValues de react-hook-form
  const accessToken = loginMutation.data?.data.data.access_token;
  const remember = getValues("remember");

  // Llamamos a la peticion dependiente 1
  const rolesQuery = useQuery({
    queryKey: ["roles", userId, companyId, accessToken],
    queryFn: () => fetchUserRoles({ userId, companyId, accessToken }),
    enabled: !!userId && !!companyId && !!accessToken, // Solo habilitar si todas las condiciones son verdaderas
  });

  // Llamamos a la peticion dependiente 2
  const permissionsQuery = useQuery({
    queryKey: ["permissions", userId, companyId, accessToken],
    queryFn: () => fetchUserPermissions({ userId, companyId, accessToken }),
    enabled: !!userId && !!companyId && !!accessToken,
  });

  // Custom hook para extraer la lógica de login
  useHandleLogin(
    loginMutation,
    rolesQuery,
    permissionsQuery,
    companyId,
    remember
  );

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
          <div className="overflow-auto mx-auto w-3/4 md:w-1/2 lg:w-1/3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <h1 className="flex justify-center mb-6 w-full text-4xl text-gray-400">
                Login
              </h1>

              <TextInput
                placeholder="Your company_id"
                id="company"
                type="number"
                icon={FaRegBuilding}
                {...register("company", { valueAsNumber: true })}
                color={errors.company ? "failure" : ""}
                helperText={errors.company?.message}
                required
              />

              <TextInput
                id="email"
                type="email"
                placeholder="Your email"
                icon={MdOutlineAlternateEmail}
                {...register("email")}
                color={errors.email ? "failure" : ""}
                helperText={errors.email?.message}
                required
              />

              <TextInput
                placeholder="Your password"
                id="password"
                type="password"
                icon={RiLockPasswordLine}
                {...register("password")}
                color={errors.password ? "failure" : ""}
                helperText={errors.password?.message}
                required
              />

              <div className="flex justify-center items-center">
                <Checkbox
                  id="remember"
                  {...register("remember")}
                  onChange={(e) => setValue("remember", e.target.checked)}
                />
                <Label htmlFor="remember">
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
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
