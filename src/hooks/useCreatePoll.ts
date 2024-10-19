import { useMutation } from "@tanstack/react-query";
import { createPoll } from "@/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

 const useCreatePoll = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createPoll,
    onSuccess: () => {
      toast.success("Poll created successfully");
      navigate("/dashboard/polls");
    },
    onError: (error: any) => {
      toast.error(`Error creating poll: ${error.message}`);
    },
  });
};

export default useCreatePoll
