import { updateAdmin } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateAdmin = () => {
  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      toast.success("Admin data updated successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(`Error updating admin info: ${error.message}`);
    },
  });
};

