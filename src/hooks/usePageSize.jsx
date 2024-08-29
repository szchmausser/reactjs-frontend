import { useState, useEffect } from "react";

const usePageSize = () => {
  const [pageSize, setPageSize] = useState(14);

  useEffect(() => {
    const handleResize = () =>
      setPageSize(
        window.innerWidth < 640
          ? 7
          : window.innerWidth < 768
          ? 10
          : window.innerWidth < 1024
          ? 12
          : 12
      );

    window.addEventListener("resize", handleResize);
    handleResize(); // Llamar una vez para establecer el tamaño inicial

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return pageSize;
};

export default usePageSize;
