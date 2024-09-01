import axios from "axios";

const appDomain = "http://localhost:8103";

export const fetchCountries = async () => {
  const response = await axios.get(`${appDomain}/api/countries`);

  return response;
};

// Aqui iran todas las demas peticiones relacionadas al modelo CountQueuingStrategy, por ejem:

// export const fetchCountry = async (id) => {
//   const response = await axios.get(`${appDomain}/api/countries/${id}`);

//   return response;
// }
