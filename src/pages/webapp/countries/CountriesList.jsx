import { useQuery } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";
import { HiMiniAdjustmentsVertical, HiCloudArrowDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/Error";
import axios from "axios";

const Test = () => {
  // const domain = appDomain;
  const domain = "http://localhost:8103/api";
  const resource = "/countries";
  const fetchOptions = null;

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["countries-list", domain, resource, fetchOptions],
    queryFn: () => axios.get(`${domain}${resource}`, fetchOptions),
  });

  if (isLoading)
    return (
      <Loading
        color={"gray"}
        message={"Wait a moment, the content is loading..."}
      />
    );

  if (isError) return <Error error={error.message} />;

  return (
    <>
      <div className="flex justify-end items-center mb-3">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Link
            to="/test"
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <div className="inline-flex justify-start items-center">
              <CgProfile />
              <span className="hidden ml-2 md:block">Profile</span>
            </div>
          </Link>

          <Link
            to="#"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <div className="inline-flex justify-start items-center">
              <HiMiniAdjustmentsVertical />
              <span className="hidden ml-2 md:block">Settings</span>
            </div>
          </Link>

          <Link
            to="#"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <div className="inline-flex justify-start items-center">
              <HiCloudArrowDown />
              <span className="hidden ml-2 md:block">Downloads</span>
            </div>
          </Link>
        </div>
      </div>

      <ul>
        {/* En el evento onclick de cada pais, es donde se ejecutara la mutacion para eliminar un elemento. */}
        {data?.data?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </>
  );
};
export default Test;
