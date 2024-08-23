import axios from "axios";

export default async function apiFetch(fetchDomain, fetchUrl, fetchOptions) {
  // const response = await fetch(`${fetchDomain}${fetchUrl}`, fetchOptions);
  // return response.json();

  const response = await axios.get(`${fetchDomain}${fetchUrl}`, fetchOptions);
  return response.data;
}
