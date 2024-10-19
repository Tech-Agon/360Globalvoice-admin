import { getAllUser } from "@/api";
import { useQuery } from "@tanstack/react-query";

 const useAllUser = () => {
    return useQuery<any, Error>({
      queryKey: ["users"],
      queryFn: getAllUser,
    });
  };

  export default useAllUser