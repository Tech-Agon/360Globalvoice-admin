import { createUser } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(`Error creating user: ${error.message}`);
    },
  });
};
