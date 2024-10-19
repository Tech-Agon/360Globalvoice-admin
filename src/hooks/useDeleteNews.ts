import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteNews } from "@/api";

export const useDeleteNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("News deleted successfully");
    },
    onError: (error: any) => {
      // console.log(error);
      toast.error(`Error deleting news: ${error.message}`);
    },
  });
};
