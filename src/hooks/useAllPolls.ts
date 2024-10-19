import { getAllPolls, updatePoll } from "@/api";
import { useRouter } from "@/routes/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const useAllPolls = () => {
  return useQuery<any, Error>({
    queryKey: ["polls"],
    queryFn: getAllPolls,
  });
};

export default useAllPolls;

// export const useOnePoll = (id: any) => {
//   const { isLoading, isError, data, error } = useQuery<any, Error>({
//     queryKey: ["singlePoll", id],
//     queryFn: () => getOnelPoll(id),
//   });

//   return {
//     isLoading,
//     isError,
//     data,
//     error,
//   };
// };

export const useUpdateOnePoll = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: updatePoll,
    onSuccess: () => {
      toast.success("poll updated successfully");
      router.push("/dashboard/polls");
    },
    onError: (error: any) => {
      toast.error(`Error updating poll : ${error.message}`);
    },
  });
};
