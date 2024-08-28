// src/hooks/useTableHeight.js
import { useState, useEffect } from "react";

const useTableHeight = () => {
  const [tableHeight, setTableHeight] = useState("600px"); // Altura predeterminada

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setTableHeight("400px"); // sm
      } else if (window.innerWidth < 768) {
        setTableHeight("500px"); // md
      } else if (window.innerWidth < 1024) {
        setTableHeight("550px"); // lg
      } else {
        setTableHeight("600px"); // xl and above
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamada inicial para establecer la altura correcta

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return tableHeight;
};

export default useTableHeight;
