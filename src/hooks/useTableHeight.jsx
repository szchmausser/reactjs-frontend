import { useState, useEffect } from "react";

const useTableHeight = () => {
  const [tableHeight, setTableHeight] = useState("600px"); // Altura predeterminada

  useEffect(() => {
    const handleResize = () =>
      setTableHeight(
        window.innerWidth < 640
          ? "400px"
          : window.innerWidth < 768
          ? "500px"
          : window.innerWidth < 1024
          ? "550px"
          : "600px"
      );

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamada inicial para establecer la altura correcta

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return tableHeight;
};

export default useTableHeight;
