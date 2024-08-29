import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * @function defineGlobalState
 * @description Creates a global state that can be accessed by any component.
 * The global state is stored in the query cache and can be updated by calling
 * the `setData` function. The `setData` function will merge the new data with the
 * existing data in the query cache and then set the merged data back to the
 * query cache. The `resetData` function will invalidate the query and refetch it,
 * which will cause the query to be fetched again from the server and the global
 * state to be updated.
 * @param {string} queryKey The key to store the global state in the query cache.
 * @param {Object} initialData The initial value of the global state.
 * @returns {Object} An object with the global state and functions to update it.
 * @property {Object} data The global state.
 * @property {function} setData A function to update the global state.
 * @property {function} resetData A function to reset the global state and refetch it.
 */
export function defineGlobalState(queryKey, initialData = null) {
  return function () {
    const queryClient = useQueryClient();

    /**
     * Function that returns the existing data from the query cache or
     * the initialData if there is no existing data.
     * This function is used as the queryFn for the useQuery hook.
     * @returns {Promise} A promise that resolves with the existing data
     * or the initialData.
     */
    const queryFn = () => {
      const existingData = queryClient.getQueryData([queryKey]);
      if (existingData) {
        return existingData;
      }
      return Promise.resolve(initialData);
    };

    const { data } = useQuery({
      queryKey: [queryKey],
      queryFn,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    /**
     * Updates the global state by merging the new data with the existing data.
     * The existing data is retrieved from the query cache and the new data is merged with it.
     * Then, the merged data is set back to the query cache.
     * @param {Object} newData The new data to be merged with the existing data.
     */
    function setData(newData) {
      const currentData = queryClient.getQueryData([queryKey]);
      queryClient.setQueryData([queryKey], { ...currentData, ...newData });
    }

    /**
     * Resets the global state to its initial state.
     * @function
     */
    function resetToInitialState() {
      queryClient.setQueryData([queryKey], initialData);
    }

    /**
     * Invalidates the query cache and removes the data from the cache.
     * The cache will be refetched when the component is rendered again.
     * @function
     */
    function clearData() {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    }

    return { data, setData, resetToInitialState, clearData };
  };
}
