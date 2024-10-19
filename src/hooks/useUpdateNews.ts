// hooks/useUpdateNews.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateNews } from "@/api";
import { useRouter } from "@/routes/hooks";

interface UpdateNewsData {
  newsId: string;
  title: string;
  content: string;
  author: string;
  image?: File;
}

export const useUpdateNews = () => {
  const queryClient = useQueryClient();
  const router = useRouter()


  return useMutation({
    mutationFn: ({ newsId, title, content, author, image }: UpdateNewsData) =>
      updateNews({ newsId, title, content, author, image }),
    onSuccess: () => {
      toast.success("News updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["news"] });
      router.push("/dashboard/news");
    },
    onError: (error: any) => {
      toast.error(`Failed to update news: ${error?.response?.data?.error}`);
    },
  });
};
