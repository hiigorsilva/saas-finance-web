import { api } from '@/lib/api'
import type { IHttpResponse } from '@/utils/http'
import type { IRegisterUser } from './auth.d'

export class AuthService {
  static async RegisterUser(name: string, email: string, password: string) {
    const data = { name, email, password }
    const res = await api.post<IHttpResponse<IRegisterUser>>(
      '/register',
      data,
      { headers: { isPublic: true } }
    )
    return res
  }
}
