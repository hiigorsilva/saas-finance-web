import { createContext, useContext, useState } from 'react'
import { AuthService } from '@/services/auth/auth'
import type { IRegisterData, ISignInData } from '@/services/auth/auth.d'
import {
  getStorageToken,
  removeStorageToken,
  setStorageToken,
} from '@/utils/auth.storage'

export interface IAuthContext {
  isAuthenticated: boolean
  signIn: (data: ISignInData) => Promise<void>
  register: (data: IRegisterData) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(getStorageToken())

  async function signIn(credentials: ISignInData) {
    const { email, password } = credentials
    const { data } = await AuthService.LoginUser(email, password)

    if (data.statusCode === 200 || data.statusCode === 201) {
      const { accessToken } = data.body
      setStorageToken(accessToken)
      setToken(accessToken)
    }
  }

  async function register(credentials: IRegisterData) {
    const { name, email, password } = credentials
    const { data } = await AuthService.RegisterUser(name, email, password)

    if (data.statusCode === 200 || data.statusCode === 201) {
      const { accessToken } = data.body
      setStorageToken(accessToken)
      setToken(accessToken)
    }
  }

  function signOut() {
    removeStorageToken()
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, signIn, register, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
