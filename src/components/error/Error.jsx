import PropTypes from "prop-types";

import { Alert } from "flowbite-react";
import { BiMessageError } from "react-icons/bi"; //https://react-icons.github.io/react-icons/

const Error = ({ message }) => {
  return (
    <Alert color="failure" icon={BiMessageError}>
      <span>An error occurred: </span> {message.message}{" "}
      {message.response?.data?.data?.errors}
    </Alert>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Error;
