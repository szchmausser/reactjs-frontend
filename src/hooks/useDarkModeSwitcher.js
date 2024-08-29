import { useEffect } from "react";
import { useTheme } from "../states/stores/themeStore";

const useDarkModeSwitcher = () => {
  const { data: dark, setData: setDark } = useTheme();

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDark({ darkMode: isDarkMode });
    document.documentElement.classList.toggle("dark", isDarkMode);
    // console.log("isDarkMode", isDarkMode);
  }, [setDark]);

  const toggleDarkMode = () => {
    const newDarkMode = !dark.darkMode;
    setDark({ darkMode: newDarkMode });
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    // console.log("newDarkMode", newDarkMode);
  };

  return [dark, toggleDarkMode];
};
export default useDarkModeSwitcher;
