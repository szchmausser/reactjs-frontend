import PropTypes from "prop-types";
import { Alert, Spinner } from "flowbite-react";
import { BsInfoCircle } from "react-icons/bs"; //https://react-icons.github.io/react-icons/

const Loading = ({ color, message }) => {
  return (
    // <div className="flex justify-start items-center">
    <Alert color={color} icon={BsInfoCircle}>
      <span className={`ml-3 text-${color}-300`}>{message}</span>
      <Spinner color={color} aria-label="Info spinner example" />
    </Alert>
    // </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Loading;
