import axios from "axios"
import { authData, GoogleNewsParams } from "./types"

const API_URL = import.meta.env.VITE_API_URL

export const signIN = async ({ email, password }: authData) => {
  try {
    const response = await axios.post(`${API_URL}/admin/login`, {
      email,
      password,
    })

    return response.data // Return the data on success
  } catch (error: any) {
    if (error.response) {
      console.log(error.response)

      // Throw the error message received from the server
      throw new Error(
        error.response.data.error ||
          "Incorrect phone number, email, or password."
      )
    } else if (error.request) {
      // Handle case where no response was received
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      // Handle any other errors
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}
export const updateAdmin = async ({
  email,
  password,
  name,
  country,
}: authData) => {
  try {
    const response = await axios.patch(`${API_URL}/users/1000`, {
      email,
      password,
      name,
      country,
    })

    return response.data // Return the data on success
  } catch (error: any) {
    if (error.response) {
      console.log(error.response)

      // Throw the error message received from the server
      throw new Error(
        error.response.data.error || "Incorrect name, email, or password."
      )
    } else if (error.request) {
      // Handle case where no response was received
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      // Handle any other errors
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`)
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch users.")
    } else if (error.request) {
      throw new Error("No response from the server. Check your network.")
    } else {
      throw new Error("Unexpected error occurred. Try again later.")
    }
  }
}

export const getAllUsers = async (page: number = 1, pageSize: number = 10) => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, {
      params: {
        page,
        pageSize,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Failed to fetch users.")
    } else if (error.request) {
      throw new Error("No response from the server. Check your network.")
    } else {
      throw new Error("Unexpected error occurred. Try again later.")
    }
  }
}

export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/users/${userId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error")
  }
}

export const deletePolls = async ({ userId, pollNo }: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/admin/poll/${userId}/${pollNo}`
    )
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error")
  }
}

export const getAllPolls = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/all-polls`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error")
  }
}
export const getOnelPoll = async (id: string | number) => {
  try {
    const response = await axios.get(`${API_URL}/admin/poll/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error")
  }
}

export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error")
  }
}

export const getGoogleNews = async (params: GoogleNewsParams = {}) => {
  const { endpoint = "latest", language = "en-US" } = params

  try {
    const url = `${API_URL}/news/external/google?endpoint=${encodeURIComponent(
      endpoint
    )}&language=${encodeURIComponent(language)}`

    const response = await axios.get(url)
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error fetching Google News"
    )
  }
}

export const createUser = async ({
  email,
  password,
  name,
  phoneNo,
  country,
}: authData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      email,
      password,
      name,
      phoneNo,
      country,
    })

    return response.data
  } catch (error: any) {
    if (error.response) {
      // Throw the error message received from the server
      throw new Error(error.response.data.error || "An Error Occured")
    } else if (error.request) {
      // Handle case where no response was received
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      // Handle any other errors
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}

interface PollData {
  title: string
  pollCountry: string
  candidates: Array<{
    name: string
    country: string
    biography: string
    image: File | null
  }>
}

interface CreatePollArgs {
  pollData: PollData
  userId: number
}

export const createPoll = async ({
  pollData,
  userId,
}: CreatePollArgs): Promise<any> => {
  const formData = new FormData()
  formData.append("title", pollData.title)
  formData.append("pollCountry", pollData.pollCountry)

  pollData.candidates.forEach((candidate, index) => {
    formData.append(`candidates[${index}][name]`, candidate.name)
    formData.append(`candidates[${index}][country]`, candidate.country)
    formData.append(`candidates[${index}][biography]`, candidate.biography)
    if (candidate.image) {
      formData.append(`candidates[${index}][image]`, candidate.image)
    }
  })

  try {
    const response = await axios.post(
      `${API_URL}/admin/poll-create/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An Error Occurred")
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}

export const updatePoll = async ({
  pollId,
  title,
  candidates,
  pollCountry,
  userId,
}: {
  pollId: string
  title: string
  pollCountry: string
  candidates: {
    name: string
    country: string
    biography: string
    image?: File
  }[]
  userId: number
}) => {
  const formData = new FormData()

  formData.append("title", title)
  formData.append("pollCountry", pollCountry)

  candidates.forEach((candidate, index) => {
    formData.append(`candidates[${index}][name]`, candidate.name)
    formData.append(`candidates[${index}][country]`, candidate.country)
    formData.append(`candidates[${index}][biography]`, candidate.biography)

    if (candidate.image) {
      formData.append(`candidates[${index}][image]`, candidate.image)
    }
  })

  const response = await axios.put(
    `${API_URL}/users/poll-update/${pollId}/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}

export const getOnePoll = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/admin/poll/${id}`)

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error while getting poll")
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}

export const createNews = async ({
  newsData,
}: {
  newsData: any
}): Promise<any> => {
  const formData = new FormData()
  formData.append("title", newsData.title)
  formData.append("content", newsData.content)
  formData.append("author", newsData.author)

  if (newsData.image) {
    formData.append("image", newsData.image)
  }

  try {
    const response = await axios.post(`${API_URL}/news`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An Error Occurred")
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}

export const getOneNews = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`)
    return response.data?.news
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error while getting news")
    } else if (error.request) {
      throw new Error(
        "No response received from server. Please check your network connection."
      )
    } else {
      throw new Error("An unexpected error occurred. Please try again later.")
    }
  }
}

export const updateNews = async ({
  newsId,
  title,
  content,
  author,
  image,
}: {
  newsId: string
  title: string
  content: string
  author: string
  image?: File
}) => {
  const formData = new FormData()
  formData.append("title", title)
  formData.append("content", content)
  formData.append("author", author)

  if (image) {
    formData.append("image", image)
  }

  const response = await axios.put(`${API_URL}/news/${newsId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

export const deleteNews = async (newsId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/news/${newsId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error deleting news")
  }
}
