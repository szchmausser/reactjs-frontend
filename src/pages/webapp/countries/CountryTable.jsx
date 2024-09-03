import PropTypes from "prop-types";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo } from "react";

const CountryTable = ({ data }) => {
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg border border-gray-200 shadow-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b last:border-0 hover:bg-gray-100"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CountryTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired, // Define the type of data prop
};

export default CountryTable;
