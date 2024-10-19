import { useMutation } from "@tanstack/react-query";
import { createNews } from "@/api";
import { toast } from "sonner";
import { useRouter } from "@/routes/hooks";

 const useCreateNews = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      toast.success("News created successfully");
      router.push("/dashboard/news");
    },
    onError: (error: any) => {
      toast.error(`Error creating news : ${error.message}`);
    },
  });
};

export default useCreateNews
