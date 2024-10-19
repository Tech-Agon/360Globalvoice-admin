import React, { useState } from "react"
import { useRouter } from "@/routes/hooks"
import { MoveLeft } from "lucide-react"
import CreateCandidate from "@/components/ui/create-candidate"
import { toast } from "sonner"
import useCreatePoll from "@/hooks/useCreatePoll"
import { countriesWithCodes } from "./helper/schema"

const MAX_CANDIDATES = 100

const CreatePoll: React.FC = () => {
  const router = useRouter()
  const [pollTitle, setPollTitle] = useState<string>("")
  const [pollCountry, setPollCountry] = useState<string>("")
  const [candidates, setCandidates] = useState<
    Array<{
      name: string
      country: string
      biography: string
      image: File | null
    }>
  >([{ name: "", country: "", biography: "", image: null }])

  const mutation = useCreatePoll()

  const handlePollTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPollTitle(event.target.value)
  }

  const handlePollCountryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPollCountry(event.target.value)
  }

  const addCandidate = () => {
    if (candidates.length < MAX_CANDIDATES) {
      setCandidates([
        ...candidates,
        { name: "", country: "", biography: "", image: null },
      ])
    }
  }

  const removeCandidate = (index: number) => {
    if (candidates.length > 1) {
      setCandidates(candidates.filter((_, i) => i !== index))
    }
  }

  const handleCandidateDataChange =
    (index: number) =>
    (data: {
      name: string
      country: string
      biography: string
      image: File | null
    }) => {
      setCandidates(
        candidates.map((candidate, i) => (i === index ? data : candidate))
      )
    }

  const validateCandidates = () => {
    return candidates.every(
      (candidate) =>
        candidate.name.trim() && candidate.biography.trim() && candidate.image
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!pollTitle || !pollCountry) {
      toast.error("Poll title and country are required.")
      return
    }

    if (!validateCandidates()) {
      toast.error("Each candidate must have a name, biography, and an image.")
      return
    }

    const pollData = {
      title: pollTitle,
      pollCountry,
      candidates,
      userId: 1000,
    }

    mutation.mutate({ pollData, userId: 1000 })
  }

  document.title = "Create Poll"

  return (
    <section className="w-full h-full antialiased mx-auto max-md:py-14 max-w-screen-xl px-3 sm:px-6 lg:px-0 flex justify-center items-start flex-col min-h-screen">
      <span onClick={router.back} className="mb-3 cursor-pointer flex gap-3">
        <MoveLeft />
        Back
      </span>
      <h1 className="text-[#8725FE] max-lg:text-3xl text-5xl font-extrabold">
        Create Poll
      </h1>

      <div className="mt-10 w-full">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="Title"
            className="relative block overflow-hidden border-b border-[#8725FE] bg-transparent pt-3 focus-within:border-[#8725FE]">
            <input
              type="text"
              id="Title"
              placeholder="Enter poll title"
              value={pollTitle}
              onChange={handlePollTitleChange}
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-2xl"
            />
            <span className="absolute start-0 top-2 -translate-y-[60%] text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
              Enter poll title
            </span>
          </label>

          {/* Poll Country Input */}
          <label
            htmlFor="Country"
            className="relative block overflow-hidden border-b border-[#8725FE] bg-transparent pt-3 focus-within:border-[#8725FE] mt-6">
            <select
              id="Country"
              value={pollCountry}
              onChange={handlePollCountryChange}
              className="peer h-8 w-full border-none bg-transparent dark:bg-[#0D0E10] p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-2xl">
              <option value="" disabled>
                Select a country
              </option>
              {countriesWithCodes.map((country, idx) => (
                <option key={idx} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <span className="absolute start-0 top-2 -translate-y-[60%] text-sm text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs">
              Select poll country
            </span>
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:gap-4 mt-10">
            {candidates.map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <CreateCandidate
                  onDataChange={handleCandidateDataChange(index)}
                />
                {candidates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCandidate(index)}
                    className="mt-2 text-red-500">
                    Remove Candidate
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={addCandidate}
              disabled={candidates.length >= MAX_CANDIDATES}
              className="px-4 py-2 bg-[#12c940] text-white rounded-md disabled:opacity-50">
              Add Candidate
            </button>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="px-4 max-md:w-full py-2 bg-[#8725FE] text-white rounded-md"
              disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Poll"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePoll
