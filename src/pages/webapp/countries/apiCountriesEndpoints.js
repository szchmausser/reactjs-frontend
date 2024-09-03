import axios from "axios";

const appDomain = "http://localhost:8103";

export const fetchCountries = async () => {
  const response = await axios.get(`${appDomain}/api/countries`);

  return response;
};

export const fetchCountriesPaginated = async (page, perPage) => {
  const response = await axios.get(
    `${appDomain}/api/countries-paginated?page=${page}&perPage=${perPage}`
  );

  return response;
};
