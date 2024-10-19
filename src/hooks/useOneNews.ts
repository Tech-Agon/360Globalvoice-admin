import { useQuery } from "@tanstack/react-query";
import { getOneNews } from "@/api";

 const useOneNews = (id: number) => {
  const { isLoading, isError, data, error } = useQuery<any, Error>({
    queryKey: ["singleNews", id],
    queryFn: () => getOneNews(id),
  });

  return {
    isLoading,
    isError,
    data,
    error,
  };
};

export default useOneNews
