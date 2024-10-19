import { getAllUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";



const useAllUsers = (page: number, pageSize: number) => {
  return useQuery<any, Error>({
    queryKey: ['users', page, pageSize],
    queryFn: () => getAllUsers(page, pageSize),
  });
};



export default useAllUsers;
