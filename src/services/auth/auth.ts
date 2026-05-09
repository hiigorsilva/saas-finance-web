import type { IHttpResponse } from '@/utils/http'
import { api } from '../api/api'
import type { IAuthUser } from './auth.d'

export class AuthService {
  static async RegisterUser(name: string, email: string, password: string) {
    const data = { name, email, password }
    const res = await api.post<IHttpResponse<IAuthUser>>('/register', data, {
      headers: { isPublic: true },
    })
    return res
  }

  static async LoginUser(email: string, password: string) {
    const data = { email, password }
    const res = await api.post<IHttpResponse<IAuthUser>>('/signin', data, {
      headers: { isPublic: true },
    })
    return res
  }
}
