import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";

export const useTanStackColumnDefinitionsCountriesTable = () => {
  const columns = useMemo(
    () => [
      {
        header: "Actions",
        footer: "Actions",
        accessorKey: "id",
        cell: ({ row }) => {
          return (
            <div className="inline-flex gap-2">
              <Link
                state={{ country: row.original }}
                to={`/countries/show/${row.original.id}`}
                className="p-1 bg-gray-300 rounded border border-gray-500 dark:bg-gray-800"
              >
                <GrScorecard />
              </Link>
              <Link
                state={{ country: row.original }}
                to={`/countries/edit/${row.original.id}`}
                className="p-1 bg-gray-300 rounded border border-gray-500 dark:bg-gray-800"
              >
                <FaEdit />
              </Link>
              <Link
                state={{ country: row.original }}
                to={`/countries/delete/${row.original.id}`}
                className="p-1 bg-gray-300 rounded border border-gray-500 dark:bg-gray-800"
              >
                <MdDeleteOutline />
              </Link>
            </div>
          );
        },
      },
      { header: "Id", footer: "Id", accessorKey: "id" },
      {
        header: "Numeric Code",
        footer: "Numeric Code",
        accessorKey: "numeric_code",
      },
      { header: "Name", footer: "Name", accessorKey: "name" },
      {
        header: "Nationality",
        footer: "Nationality",
        accessorKey: "nationality",
      },
      {
        header: "Capital",
        footer: "Capital",
        accessorKey: "capital",
      },
      { header: "Native", footer: "Native", accessorKey: "native" },
      {
        header: "Phone Code",
        footer: "Phone Code",
        accessorKey: "phone_code",
      },
      {
        header: "Currency",
        footer: "Currency",
        accessorKey: "currency",
      },
      {
        header: "Currency Name",
        footer: "Currency Name",
        accessorKey: "currency_name",
      },
      {
        header: "Currency Symbol",
        footer: "Currency Symbol",
        accessorKey: "currency_symbol",
      },
      {
        header: "Region Id",
        footer: "Region Id",
        accessorKey: "region_id",
      },
      { header: "Region", footer: "Region", accessorKey: "region" },
      {
        header: "Subregion Id",
        footer: "Subregion Id",
        accessorKey: "subregion_id",
      },
      {
        header: "Subregion",
        footer: "Subregion",
        accessorKey: "subregion",
      },
      {
        header: "Latitude",
        footer: "Latitude",
        accessorKey: "latitude",
      },
      {
        header: "Longitude",
        footer: "Longitude",
        accessorKey: "longitude",
      },
      { header: "Tld", footer: "Tld", accessorKey: "tld" },
      { header: "Iso2", footer: "Iso2", accessorKey: "iso2" },
      { header: "Iso3", footer: "Iso3", accessorKey: "iso3" },
    ],
    []
  );
  return columns;
};
