import axios from "axios";
// import {
//   doLogin,
//   failLogin,
//   getPermissions,
//   getRoles,
// } from "../../utils/fakeApiResponses";

const appDomain = import.meta.env.VITE_APP_DOMAIN;

export const loginUser = async (credentials) => {
  // const response = await doLogin();
  // const response = await failLogin();
  const response = await axios.post(`${appDomain}/api/login`, credentials);
  // console.log("loginUser", response);
  return response;
};

export const fetchUserPermissions = async ({
  userId,
  companyId,
  accessToken,
}) => {
  // const response = await getPermissions();
  const response = await axios.get(
    `${appDomain}/api/show-user-permissions-by-company/${userId}/${companyId}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  // console.log("fetchUserPermissions", response);
  return response;
};

export const fetchUserRoles = async ({ userId, companyId, accessToken }) => {
  // const response = await getRoles();
  const response = await axios.get(
    `${appDomain}/api/show-user-related-roles-by-company/${userId}/${companyId}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  // console.log("fetchUserRoles", response);
  return response;
};
