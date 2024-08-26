import { useQuery } from "@tanstack/react-query";
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error.jsx";
import { fetchCountries } from "./CountriesEndpoints.js";

const CountriesList = () => {
  const countriesQuery = useQuery({
    queryKey: ["countries-list"],
    queryFn: fetchCountries,
  });

  if (countriesQuery.isLoading)
    return (
      <Loading
        color={"blue"}
        message={"Wait a moment, the content is loading..."}
      />
    );

  if (countriesQuery.isError) return <Error message={countriesQuery.error} />;

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
          <div className="overflow-auto w-full">
            <div className="flex justify-end">
              <Link
                to={-1}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <div className="inline-flex justify-start items-center">
                  <IoChevronBackCircle />
                  <span className="hidden ml-2 md:block">Go back</span>
                </div>
              </Link>
            </div>

            <div className="overflow-y-scroll mt-4">
              <ul>
                {/* En el evento onclick de cada pais, es donde se ejecutara la mutacion para eliminar un elemento. */}
                {countriesQuery.data?.data?.map((country) => (
                  <li key={country.id} className="p-1">
                    <Link
                      to={`/countries/show/${country.id}`}
                      state={{ country }}
                      className="px-1 ml-2 bg-gray-200 rounded border border-black border-solid"
                    >
                      show
                    </Link>
                    <Link
                      to={`/countries/edit/${country.id}`}
                      state={{ country }}
                      className="px-1 ml-2 bg-gray-200 rounded border border-black border-solid"
                    >
                      edit
                    </Link>
                    <Link
                      to={`/countries/delete/${country.id}`}
                      state={{ country }}
                      className="px-1 ml-2 bg-gray-200 rounded border border-black border-solid"
                    >
                      delete
                    </Link>{" "}
                    - {country.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CountriesList;
