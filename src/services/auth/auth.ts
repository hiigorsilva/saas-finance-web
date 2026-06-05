import type { ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { IAuthUser } from './auth.d'

export class AuthService {
  static async RegisterUser(name: string, email: string, password: string) {
    const data = { name, email, password }
    const response = await api.post<ApiResponse<IAuthUser>>('/register', data, {
      headers: { isPublic: true },
    })

    return response.data.data
  }

  static async LoginUser(email: string, password: string) {
    const data = { email, password }
    const response = await api.post<ApiResponse<IAuthUser>>('/signin', data, {
      headers: { isPublic: true },
    })

    return response.data.data
  }
}
