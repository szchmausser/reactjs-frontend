import { defineGlobalState } from "../defineGlobalState";

const initialSessionState = {
  login: null,
  user: null,
  company: null,
  roles: [],
  permissions: [],
};

export const useSession = defineGlobalState("sessionData", initialSessionState);
