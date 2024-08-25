import axios from "axios";

const appDomain = "http://localhost:8103";

export const fetchCountries = async () => {
  const response = await axios.get(`${appDomain}/api/countries`);

  return response;
};
