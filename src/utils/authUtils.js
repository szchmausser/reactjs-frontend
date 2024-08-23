export const isUserAuthorized = (
  contextSessionData,
  requiredPermissions = [],
  requiredRoles = []
) => {
  // Verificar si el usuario está logueado
  if (!contextSessionData?.login?.access_token) {
    console.log(
      "No hay usuario logueado",
      contextSessionData?.login?.access_token
    );
    return false; // Si el usuario no está logueado, no se permite el acceso.
  }

  // console.log("SessionData", contextSessionData);

  const availableUserPermissions =
    contextSessionData?.permissions?.map((permission) => permission.name) || [];

  const availableUserRoles =
    contextSessionData?.roles?.map((role) => role.name) || [];

  // console.log("availableUserPermissions", availableUserPermissions);
  // console.log("requiredPermissions", requiredPermissions);
  // console.log("availableUserRoles", availableUserRoles);
  // console.log("requiredRoles", requiredRoles);

  // Caso 1: Solo se requiere que el usuario esté logueado
  if (requiredPermissions.length === 0 && requiredRoles.length === 0) {
    // console.log("Caso 1: Solo se requiere que el usuario esté logueado");
    return true; // Si no se requieren permisos ni roles, solo se necesita que esté logueado.
  }

  // Caso 2 y 3: Verificar si el usuario tiene al menos uno de los roles o permisos necesarios
  const hasRequiredRoles =
    requiredRoles.length > 0
      ? requiredRoles.some((role) => {
          const result = availableUserRoles.includes(role);
          // console.log(`Verificando rol: ${role}, resultado: ${result}`);
          return result;
        })
      : false; // Se establece como false si no se requiere ningún rol.

  const hasRequiredPermissions =
    requiredPermissions.length > 0
      ? requiredPermissions.some((permission) => {
          const result = availableUserPermissions?.includes(permission);
          // console.log(`Verificando permiso: ${permission}, resultado: ${result}`);
          return result;
        })
      : false; // Se establece como false si no se requiere ningún permiso.

  // Caso 4: Autorizar si el usuario cumple con al menos uno de los roles o permisos
  const isAuthorized = hasRequiredRoles || hasRequiredPermissions;
  // console.log(`Caso 3 o 4: Usuario autorizado: ${isAuthorized}`);
  return isAuthorized;

  // Ejemplos:

  // Caso 1: Solo requiere que el usuario esté logueado

  /* <Route
    path="dashboard"
    element={
      <ProtectedRoutes
        isAllowed={isUserAuthorized(contextSessionData)}
        redirectTo={contextSessionData ? "/unauthorized" : "/login"}
      >
        <Dashboard />
      </ProtectedRoutes>
    }
  /> */

  // Caso 2: Requiere que el usuario esté logueado y tenga el rol role1

  /* <Route
    path="admin"
    element={
      <ProtectedRoutes
        isAllowed={isUserAuthorized(contextSessionData, [], ["role1"])}
        redirectTo={contextSessionData ? "/unauthorized" : "/login"}
      >
        <AdminPanel />
      </ProtectedRoutes>
    }
  /> */

  // Caso 3: Requiere que el usuario esté logueado y tenga el permiso permission1

  /* <Route
  path="settings"
  element={
    <ProtectedRoutes
      isAllowed={isUserAuthorized(contextSessionData, ["permission1"])}
      redirectTo={contextSessionData ? "/unauthorized" : "/login"}
    >
      <Settings />
    </ProtectedRoutes>
  }
  /> */

  // Caso 4: Requiere que el usuario esté logueado y tenga el rol role1 o el permiso permission1

  /* <Route
  path="special-feature"
  element={
    <ProtectedRoutes
      isAllowed={isUserAuthorized(contextSessionData, ["permission1"], ["role1"])}
      redirectTo={contextSessionData ? "/unauthorized" : "/login"}
    >
      <SpecialFeature />
    </ProtectedRoutes>
  }
  /> */

  //PRUEBAS REALIZADAS

  //-La ruta solamente pide un permiso - PROBADO
  //---El usuario no tiene el permiso - OK
  //---El usuario tiene permiso - OK

  //-La ruta solamente pide un rol - PROBADO
  //---El usuario no tiene el rol - OK
  //---El usuario tiene rol - OK

  //-La ruta pide un permiso o un rol - PROBADO
  //---El usuario no tiene ni el permiso ni el rol - OK
  //---El usuario tiene permiso - OK
  //---El usuario tiene el rol - OK
  //---El usuario tiene el permiso y el rol
};
