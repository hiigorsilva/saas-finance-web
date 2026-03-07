import axios from 'axios'
import { getStorageToken } from '@/utils/auth.storage'

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
    const isPublicRoute = config.headers?.isPublic

    if (!isPublicRoute && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.headers?.isPublic) {
      delete config.headers.isPublic
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
