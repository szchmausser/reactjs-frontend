export const apiFetcher = async (
  appDomain,
  fetchRoute,
  fetchOptions,
  setErrorUI
) => {
  try {
    const response = await fetch(`${appDomain}${fetchRoute}`, fetchOptions);

    if (response.status === 200) {
      const data = await response.json(); //Convertir respuesta a JSON para que deje de ser una promesa y poder leer su contenido
      return data;
    }

    if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 422
    ) {
      setErrorUI(response.status + " - " + response.statusText);
      throw new Error(response.status + " - " + response.statusText);
    }

    if (response.status === 500) {
      setErrorUI(
        "Internal server error." + response.status + " - " + response.statusText
      );
      throw new Error(
        "Internal server error." + response.status + " - " + response.statusText
      );
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    setErrorUI("Error fetching data: " + error);
    throw error;
  }
};
