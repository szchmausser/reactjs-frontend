import { useQuery } from "@tanstack/react-query";
import { FaPlusCircle } from "react-icons/fa";
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Error from "../../../components/error/Error";
import Loading from "../../../components/loading/Loading";
import TanStackTableClientSidePagination from "../../../components/tan-stack-table/TanStackTableClientSidePagination";
import { fetchCountries } from "./apiCountriesEndpoints";
import { useTanStackColumnDefinitionsCountriesTable } from "./useTanStackColumnDefinitionsCountriesTable";
import { useMemo } from "react";

const CountriesTanStackTablePaginateClientSideData = () => {
  // Fetch using TanStack query and get data for TanStack table
  const countriesQuery = useQuery({
    queryKey: ["countries-list"],
    queryFn: fetchCountries,
    refetchInterval: 1000 * 60,
    keepPreviousData: true,
  });

  // Definimos los datos para la tabla
  const tableData = useMemo(
    () => countriesQuery.data?.data,
    [countriesQuery.data]
  ); // Se recomiendo memoizar

  // Define the columns for TanStack table
  const tableColumns = useTanStackColumnDefinitionsCountriesTable();

  if (countriesQuery.isLoading)
    return (
      <Loading
        color={"blue"}
        message={"Wait a moment, the content is loading..."}
      />
    );

  if (countriesQuery.isError) return <Error message={countriesQuery.error} />;

  return (
    <div className="flex w-full min-h-screen">
      <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
        <div className="w-full">
          <div className="flex gap-2 justify-end">
            <Link
              to={"/countries/create"}
              className="px-4 py-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <div className="inline-flex justify-start items-center">
                <FaPlusCircle />
                <span className="hidden ml-2 md:block">New</span>
              </div>
            </Link>
            <Link
              to={-1}
              className="px-4 py-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <div className="inline-flex justify-start items-center">
                <IoChevronBackCircle />
                <span className="hidden ml-2 md:block">Go back</span>
              </div>
            </Link>
          </div>

          <TanStackTableClientSidePagination
            data={tableData}
            columns={tableColumns}
          />
        </div>
      </div>
    </div>
  );
};

export default CountriesTanStackTablePaginateClientSideData;
