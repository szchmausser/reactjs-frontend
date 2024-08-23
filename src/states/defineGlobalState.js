import { useQuery, useQueryClient } from "@tanstack/react-query";

export function defineGlobalState(queryKey, initialData = null) {
  return function () {
    const queryClient = useQueryClient();

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

    function setData(newData) {
      const currentData = queryClient.getQueryData([queryKey]);
      queryClient.setQueryData([queryKey], { ...currentData, ...newData });
    }

    function resetData() {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.refetchQueries({ queryKey: [queryKey] });
    }

    return { data, setData, resetData };
  };
}
