import { useCallback } from "react";
import { useSession } from "../states/stores/sessionStore"; // Ajusta la ruta según tu estructura de archivos

export const useUserAuthorization = () => {
  const { data: contextSessionData } = useSession();

  const isUserAuthorized = useCallback(
    (requiredPermissions = [], requiredRoles = []) => {
      // Cláusula de guarda 1: Verificación de autenticación. Si no hay token, el usuario no está autenticado y se deniega el acceso inmediatamente.
      if (!contextSessionData?.login?.access_token) {
        // console.log("Usuario no autenticado. Acceso denegado.");
        return false;
      }

      // Cláusula de guarda 2: Verificación de requisitos de acceso. Si la ruta no requiere permisos ni roles específicos, se permite el acceso a cualquier usuario autenticado.
      if (requiredPermissions.length === 0 && requiredRoles.length === 0) {
        // console.log("No se requieren permisos ni roles específicos. Acceso permitido.");
        return true;
      }

      // Extracción y aplanamiento de datos de permisos y roles:
      const availableUserPermissions =
        contextSessionData?.permissions?.map((permission) => permission.name) ||
        [];
      const availableUserRoles =
        contextSessionData?.roles?.map((role) => role.name) || [];

      // Verificación de permisos y roles:
      const hasRequiredPermissions =
        requiredPermissions.length > 0 &&
        requiredPermissions.some((requiredPermission) => {
          const result = availableUserPermissions.includes(requiredPermission);
          // console.log(`Verificando permiso | Requerido: ${requiredPermission}, Aprobado?: ${result}`);
          return result;
        });

      const hasRequiredRoles =
        requiredRoles.length > 0 &&
        requiredRoles.some((requiredRole) => {
          const result = availableUserRoles.includes(requiredRole);
          // console.log(`Verificando rol | Requerido: ${requiredRole}, Aprobado?: ${result}`);
          return result;
        });

      // Evaluación final de autorización:
      const isAuthorized = hasRequiredPermissions || hasRequiredRoles;
      // console.log(`Evaluación final -> isAuthorized?: ${isAuthorized}`);

      return isAuthorized;
    },
    [contextSessionData]
  );

  return isUserAuthorized;
};
