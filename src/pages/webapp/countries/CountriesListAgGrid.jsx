import { useQuery } from "@tanstack/react-query";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { FaEdit } from "react-icons/fa";
import { GrScorecard } from "react-icons/gr";
import { IoChevronBackCircle } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Error from "../../../components/error/Error";
import Loading from "../../../components/loading/Loading";
import { useTheme } from "../../../states/stores/themeStore";
import { fetchCountries } from "./apiCountriesEndpoints";

const CountriesListAgGrid = () => {
  const { data: dark } = useTheme();

  const countriesQuery = useQuery({
    queryKey: ["countries-list"],
    queryFn: fetchCountries,
  });

  // Define the columns for AG Grid
  const agcolumns = [
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="inline-flex gap-2 pt-2">
          <Link
            state={{ country: params.data }}
            to={`/countries/show/${params.data.id}`}
            className="p-1 text-gray-500 bg-gray-300 rounded border border-gray-400 dark:text-gray-400 dark:bg-gray-800"
          >
            <GrScorecard />
          </Link>
          <Link
            state={{ country: params.data }}
            to={`/countries/edit/${params.data.id}`}
            className="p-1 text-gray-500 bg-gray-300 rounded border border-gray-400 dark:text-gray-400 dark:bg-gray-800"
          >
            <FaEdit />
          </Link>
          <Link
            state={{ country: params.data }}
            to={`/countries/delete/${params.data.id}`}
            className="p-1 text-gray-500 bg-gray-300 rounded border border-gray-400 dark:text-gray-400 dark:bg-gray-800"
          >
            <MdDeleteOutline />
          </Link>
        </div>
      ),
    },
    { headerName: "Id", field: "id", sortable: true, filter: true },
    {
      headerName: "Numeric Code",
      field: "numeric_code",
      sortable: true,
      filter: true,
    },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Nationality",
      field: "nationality",
      sortable: true,
      filter: true,
    },
    { headerName: "Capital", field: "capital", sortable: true, filter: true },
    { headerName: "Native", field: "native", sortable: true, filter: true },
    {
      headerName: "Phone Code",
      field: "phone_code",
      sortable: true,
      filter: true,
    },
    { headerName: "Currency", field: "currency", sortable: true, filter: true },
    {
      headerName: "Currency Name",
      field: "currency_name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Currency Symbol",
      field: "currency_symbol",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Region Id",
      field: "region_id",
      sortable: true,
      filter: true,
    },
    { headerName: "Region", field: "region", sortable: true, filter: true },
    {
      headerName: "Subregion Id",
      field: "subregion_id",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Subregion",
      field: "subregion",
      sortable: true,
      filter: true,
    },
    { headerName: "Latitude", field: "latitude", sortable: true, filter: true },
    {
      headerName: "Longitude",
      field: "longitude",
      sortable: true,
      filter: true,
    },
    { headerName: "Tld", field: "tld", sortable: true, filter: true },
    { headerName: "Iso2", field: "iso2", sortable: true, filter: true },
    { headerName: "Iso3", field: "iso3", sortable: true, filter: true },
  ];

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

          <div
            className={
              dark.darkMode ? "ag-theme-quartz-dark" : "ag-theme-quartz"
            }
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              columnDefs={agcolumns}
              rowData={countriesQuery.data?.data}
              pagination={true}
              paginationAutoPageSize={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountriesListAgGrid;
