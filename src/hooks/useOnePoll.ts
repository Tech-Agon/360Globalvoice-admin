import { getOnePoll } from "@/api";
import { useQuery } from "@tanstack/react-query";

 const useOnePoll = (id: any) => {
  const { isLoading, isError, data, error, refetch } = useQuery<any, Error>({
    queryKey: ["singlePoll", id],
    queryFn: () => getOnePoll(id),
  });

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  };
};

export default useOnePoll


