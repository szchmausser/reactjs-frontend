import PropTypes from "prop-types";
import { Spinner } from "flowbite-react";

const Loading = ({ color, message }) => {
  return (
    <div className="flex justify-start items-center">
      <Spinner color={color} aria-label="Failure spinner example" />
      <span className="ml-3 text-gray-500">{message}</span>
    </div>
  );
};

Loading.propTypes = {
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Loading;
