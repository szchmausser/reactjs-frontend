import { useLocation } from "react-router-dom";

const CountryEdit = () => {
  const location = useLocation();
  const { country } = location.state;
  return <div>CountryEdit = {country.name}</div>;
};
export default CountryEdit;
