import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <Button
        color="failure"
        size="sm"
        className="mt-4"
        onClick={() => navigate(-1)}
      >
        Go back...
      </Button>
    </>
  );
};

export default Forbidden;
