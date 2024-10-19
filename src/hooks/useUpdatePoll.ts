import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updatePoll } from "@/api"
import { useNavigate } from "react-router-dom"

interface UpdatePollData {
  pollId: string
  title: string
  pollCountry: string
  candidates: { name: string; country: string; biography: string }[]
  userId: number
  country: string
}

export const useUpdatePoll = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({
      pollId,
      title,
      candidates,
      pollCountry,
      userId,
    }: UpdatePollData) =>
      updatePoll({ pollId, title, pollCountry, candidates, userId }),
    onSuccess: () => {
      toast.success("Poll updated successfully!")
      queryClient.invalidateQueries({
        queryKey: ["polls"],
      })
      navigate("/dashboard/polls")
    },
    onError: (error: any) => {
      // console.error(error);

      toast.error(`Failed to update poll: ${error?.response?.data?.error}`)
    },
  })
}
