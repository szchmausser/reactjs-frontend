import PropTypes from "prop-types";

import { Alert } from "flowbite-react";
import { MdErrorOutline } from "react-icons/md"; //https://react-icons.github.io/react-icons/

const Error = ({ message }) => {
  return (
    <Alert color="failure" icon={MdErrorOutline}>
      <span className="font-medium">An error occurred: </span> {message.message}{" "}
      {message.response?.data?.data?.errors}
    </Alert>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
export default Error;
