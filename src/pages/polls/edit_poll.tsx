import React, { useEffect, useState } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useParams } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoveLeft } from "lucide-react"
import { useUpdatePoll } from "@/hooks/useUpdatePoll"
import { countriesWithCodes, pollSchema } from "./create_poll/helper/schema"
import { useRouter } from "@/routes/hooks"
import { useAppSelector } from "@/state/store"
import useOnePoll from "@/hooks/useOnePoll"

const EditPoll: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: pollData, isLoading, isError } = useOnePoll(id)
  const currentUser = useAppSelector(
    (state) => state?.persistedReducer?.AdminData
  )?.id

  const router = useRouter()

  const { mutate: updatePoll, isPending } = useUpdatePoll()

  type PollFormValues = z.infer<typeof pollSchema>

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PollFormValues>({
    defaultValues: {
      title: "",
      candidates: [
        { name: "", biography: "", image: "", country: "", pollcountry: "" },
      ],
      pollcountry: pollData?.poll?.country, // Add default value for Pollcountry
    },
    resolver: zodResolver(pollSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "candidates",
  })

  // console.log(pollData)

  useEffect(() => {
    if (pollData?.poll) {
      reset({
        title: pollData?.poll?.title,
        candidates: pollData?.poll?.candidates || [],
        pollcountry: pollData?.poll?.country, // Reset Pollcountry
      })
    }
  }, [pollData, reset])

  const onSubmit = (data: PollFormValues) => {
    updatePoll({
      pollId: id || "",
      title: data.title,
      pollCountry: data.pollcountry || "",
      candidates: data.candidates.map((candidate) => ({
        ...candidate,
        image:
          candidate.image instanceof File ? candidate.image : candidate.image,
      })),
      userId: currentUser || 0,
      country: data.pollcountry || "", // Include Pollcountry in the API call
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: Could not fetch poll data</p>
  }

  document.title = `Edit ${pollData?.poll?.title} Poll`

  return (
    <div className="container mx-auto p-4 my-4">
      <span onClick={router.back} className="mb-3 cursor-pointer flex gap-3">
        <MoveLeft />
        Back
      </span>
      <h1 className="text-[#8725FE] w-full max-lg:text-xl sticky top-0 bg-[#F8F8F9] dark:bg-[#0D0E10] py-3 md:py-4 tracking-tight mb-6 text-2xl font-bold capitalize">
        Edit "{pollData?.poll?.title}" poll
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Poll Title */}
        <div>
          <label className="block text-sm font-semibold">Poll Title</label>
          <input
            {...register("title")}
            type="text"
            className="mt-1 block w-full dark:bg-[#131317] capitalize p-4 rounded-md shadow-sm focus:border-b-purple-500 sm:text-base outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Poll Country */}
        <div>
          <label className="block text-sm font-semibold">Poll Country</label>
          <select
            {...register("pollcountry")}
            className="mt-1 block w-full dark:bg-[#131317] p-2 rounded-md shadow-sm focus:border-b-purple-500 sm:text-sm outline-none">
            <option value="" disabled>
              Select a country
            </option>
            {countriesWithCodes.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.pollcountry && (
            <p className="text-red-500 text-xs mt-1">
              {errors.pollcountry.message}
            </p>
          )}
        </div>

        {/* Candidates */}
        <div>
          <label className="block text-sm font-semibold mb-3">Candidates</label>
          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-md p-4 mb-4">
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white py-1 px-2 text-sm rounded mb-2">
                Delete Candidate
              </button>

              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                  {/* Image Preview */}
                  <Controller
                    name={`candidates.${index}.image`}
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      const [imageUrl, setImageUrl] = useState<
                        string | ArrayBuffer | null
                      >(value && typeof value === "string" ? value : null)

                      const handleImageChange = (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (e.target.files?.[0]) {
                          const file = e.target.files[0]
                          setImageUrl(URL.createObjectURL(file))
                          onChange(file)
                        }
                      }

                      return (
                        <div>
                          <input
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                            id={`image-${index}`}
                          />
                          <label
                            htmlFor={`image-${index}`}
                            className="cursor-pointer w-full h-full flex items-center justify-center">
                            {imageUrl ? (
                              <img
                                src={imageUrl as string}
                                alt="Preview"
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <p className="text-gray-500">No Image</p>
                            )}
                          </label>
                        </div>
                      )
                    }}
                  />
                </div>

                <div className="flex-1">
                  <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                      {...register(`candidates.${index}.name`)}
                      type="text"
                      defaultValue={field.name}
                      className="mt-1 dark:bg-[#131317] block w-full p-3 capitalize rounded-md shadow-sm focus:border-b-purple-500 sm:text-base outline-none"
                    />
                    {errors.candidates?.[index]?.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.candidates[index].name.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium">
                      Biography
                    </label>
                    <textarea
                      {...register(`candidates.${index}.biography`)}
                      defaultValue={field.biography}
                      className="mt-1 block w-full dark:bg-[#131317] border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm outline-none p-3"
                    />
                    {errors.candidates?.[index]?.biography && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.candidates[index].biography.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium">Country</label>
                    <select
                      {...register(`candidates.${index}.country`)}
                      defaultValue={field.country}
                      className="mt-1 block w-full dark:bg-[#131317] p-2 capitalize rounded-md shadow-sm focus:border-b-purple-500 sm:text-sm outline-none">
                      <option value="" disabled>
                        Select a country
                      </option>
                      {countriesWithCodes.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {errors.candidates?.[index]?.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.candidates[index].country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({ name: "", biography: "", image: "", country: "" })
            }
            className="bg-blue-500 text-white py-1 px-2 rounded mt-4"
            disabled={fields.length >= 100}>
            Add Candidate
          </button>
          {fields.length < 2 && (
            <p className="text-red-500 text-xs mt-2">
              At least 2 candidates are required
            </p>
          )}
          {fields.length >= 100 && (
            <p className="text-red-500 text-xs mt-2">
              Cannot add more than 100 candidates
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
          disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  )
}

export default EditPoll
