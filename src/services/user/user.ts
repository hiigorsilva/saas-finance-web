import type { ApiResponse } from '@/services/api/types'
import { api } from '../api/client'
import type { IUserLogged } from './user.d'

export class UserService {
  static async GetUserLogged() {
    const response = await api.get<ApiResponse<IUserLogged>>('/me')

    return response.data.data
  }
}
