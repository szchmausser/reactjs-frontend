import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Error from "../../../components/error/Error.jsx";
import Loading from "../../../components/loading/Loading.jsx";
import TanStackTableServerSidePagination from "../../../components/tan-stack-table/TanStackTableServerSidePagination.jsx";
import { fetchCountriesPaginated } from "./apiCountriesEndpoints.js";

const CountriesTanStackTablePaginateServerSideData = () => {
  const defaultPageSize = 7; // Definimos el tamaño de página por defecto

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize, // Usamos el tamaño de página por defecto
  });

  const handlePaginationChange = (newPagination) => {
    setPagination(newPagination);
  };

  const countriesQuery = useQuery({
    queryKey: ["countries-list", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchCountriesPaginated(pagination.pageIndex + 1, pagination.pageSize),
    staleTime: 1000 * 60,
    keepPreviousData: true,
  });

  // Define the columns for TanStack table
  const columns = useMemo(
    () => [
      { header: "Id", accessorKey: "id" },
      {
        header: "Numeric Code",
        accessorKey: "numeric_code",
      },
      { header: "Name", accessorKey: "name" },
      {
        header: "Nationality",
        accessorKey: "nationality",
      },
      {
        header: "Capital",
        accessorKey: "capital",
      },
      { header: "Native", accessorKey: "native" },
      {
        header: "Phone Code",
        accessorKey: "phone_code",
      },
      {
        header: "Currency",
        accessorKey: "currency",
      },
      {
        header: "Currency Name",
        accessorKey: "currency_name",
      },
      {
        header: "Currency Symbol",
        accessorKey: "currency_symbol",
      },
      {
        header: "Region Id",
        accessorKey: "region_id",
      },
      { header: "Region", accessorKey: "region" },
      {
        header: "Subregion Id",
        accessorKey: "subregion_id",
      },
      {
        header: "Subregion",
        accessorKey: "subregion",
      },
      {
        header: "Latitude",
        accessorKey: "latitude",
      },
      {
        header: "Longitude",
        accessorKey: "longitude",
      },
      { header: "Tld", accessorKey: "tld" },
      { header: "Iso2", accessorKey: "iso2" },
      { header: "Iso3", accessorKey: "iso3" },
    ],
    []
  );

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
          <div className="flex justify-end">
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

          <TanStackTableServerSidePagination
            data={countriesQuery.data?.data.data}
            columns={columns}
            pageCount={countriesQuery.data?.data.last_page || 0}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            defaultPageSize={pagination.pageSize} // Pasamos el tamaño de página por defecto
          />
        </div>
      </div>
    </div>
  );
};

export default CountriesTanStackTablePaginateServerSideData;
