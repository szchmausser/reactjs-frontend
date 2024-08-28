import { defineGlobalState } from "../defineGlobalState";

const initialThemeState = {
  darkMode: false,
};

export const useTheme = defineGlobalState("themeStore", initialThemeState);
