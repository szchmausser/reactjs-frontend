import { useLocation } from "react-router-dom";

const CountryDelete = () => {
  const location = useLocation();
  const { country } = location.state;
  return <div>CountryDelete = {country.name}</div>;
};
export default CountryDelete;
