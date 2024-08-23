import { useLocation } from "react-router-dom";

const CountryShow = () => {
  const location = useLocation();
  const { country } = location.state;
  return <div>CountryShow = {country.name}</div>;
};
export default CountryShow;
