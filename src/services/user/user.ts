import type { IHttpResponse } from '@/utils/http'
import { api } from '../api/api'
import type { IUserLogged } from './user.d'

export class UserService {
  static async GetUserLogged() {
    const res = await api.get<IHttpResponse<IUserLogged>>('/me')
    return res
  }
}
