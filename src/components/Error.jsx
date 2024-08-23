import PropTypes from "prop-types";

import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const Error = ({ error }) => {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">An error occurred: </span> {error}
    </Alert>
  );
};

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
export default Error;
