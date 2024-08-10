import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { AuthResponse } from "../../models/authorization.ts"
import {
  LOCAL_STAORAGE_KEY_ACCESS,
  LOCAL_STAORAGE_KEY_REFRESH,
} from "../const/localStorage.tsx"
export const API_URL = "/api"

interface AxiosErrorType extends AxiosError {
  config: AxiosConfigType
}

interface AxiosConfigType extends InternalAxiosRequestConfig {
  _isRetry: boolean
}

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

export const $apiWithoutToken = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  const access = localStorage.getItem(LOCAL_STAORAGE_KEY_ACCESS)
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
})

$api.interceptors.response.use(
  (config) => config,
  async (error: AxiosErrorType) => {
    const originalRequest = error.config
    if (
      error.response?.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post<AuthResponse>(
          `${API_URL}/token/refresh/`,
          { refresh: localStorage.getItem(LOCAL_STAORAGE_KEY_REFRESH) },
        )

        const { access } = response.data
        localStorage.setItem(LOCAL_STAORAGE_KEY_ACCESS, access)
        originalRequest.headers.Authorization = `Bearer ${access}`

        if (originalRequest.data instanceof FormData) {
          const formData = new FormData()
          originalRequest.data.forEach((value, key) => {
            formData.append(key, value)
          })
          originalRequest.data = formData
        }

        if (originalRequest.url?.includes("token/verify")) {
          originalRequest.data = { token: access }
        }

        return $api.request(originalRequest)
      } catch (e) {
        console.log("пользователь не авторизован")
      }
    }
    throw error
  },
)
