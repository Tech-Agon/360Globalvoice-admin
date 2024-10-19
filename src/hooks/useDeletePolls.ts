import { deletePolls } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeletePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePolls,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["polls"] });
      toast.success("Poll deleted successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(`Error deleting poll: ${error.message}`);
    },
  });
};
