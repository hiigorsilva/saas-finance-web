import axios from 'axios'
import { getStorageToken, removeStorageToken } from '@/utils/auth.storage'

type PublicHeaders = {
  isPublic?: boolean
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getStorageToken() || ''}`,
  },
})

api.interceptors.request.use(
  config => {
    const token = getStorageToken()
    const headers = config.headers as PublicHeaders
    const isPublicRoute = headers?.isPublic

    if (!isPublicRoute && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (headers?.isPublic) {
      delete headers.isPublic
    }

    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status

    if (status === 401) {
      removeStorageToken()

      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/login'
      ) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)
