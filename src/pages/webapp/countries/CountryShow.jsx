import { Link, useLocation } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

const CountryShow = () => {
  const location = useLocation();
  const { country } = location.state;
  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="container flex flex-wrap px-5 py-24 mx-auto break-words">
          <div className="overflow-auto w-full">
            <div className="flex justify-end">
              <Link
                to={-1}
                className="px-4 py-2 mt-2 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                <div className="inline-flex justify-start items-center">
                  <IoChevronBackCircle />
                  <span className="hidden ml-2 md:block">Go back</span>
                </div>
              </Link>
            </div>
            <div>CountryShow = {country.name}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CountryShow;
