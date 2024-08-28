// src/hooks/usePageSize.js
import { useState, useEffect } from "react";

const usePageSize = () => {
  const [pageSize, setPageSize] = useState(14);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPageSize(7); // sm
      } else if (window.innerWidth < 768) {
        setPageSize(10); // md
      } else if (window.innerWidth < 1024) {
        setPageSize(12); // lg
      } else {
        setPageSize(12); // xl and above
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar una vez para establecer el tamaño inicial

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
};

export default usePageSize;
