import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  },
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
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
