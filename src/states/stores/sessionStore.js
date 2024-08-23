import { defineGlobalState } from "../defineGlobalState";

export const useSession = defineGlobalState("sessionData", {
  login: null,
});
