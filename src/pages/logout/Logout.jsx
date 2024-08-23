import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const reset = () => {
    queryClient.clear(); //Borra TODAS las queries de la cache
    navigate("/login");
  };

  return (
    <>
      <button onClick={() => reset()}>Logout</button>
    </>
  );
};
export default Logout;
