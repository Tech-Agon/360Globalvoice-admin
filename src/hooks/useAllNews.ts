import { getAllNews, getGoogleNews } from "@/api";
import { GoogleNewsParams } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

 const useAllNews = () => {
  return useQuery<any, Error>({
    queryKey: ["news"],
    queryFn: getAllNews,
  });
};

export default useAllNews

export const useGoogleNews = (params?: GoogleNewsParams) => {
  return useQuery<any, Error>({
    queryKey: ["googleNews", params],
    queryFn: () => getGoogleNews(params),
  });
};
