import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/user/user'

export const userLoggedQueryKey = ['user', 'logged'] as const

export function useUserLoggedQuery() {
  return useQuery({
    queryKey: userLoggedQueryKey,
    queryFn: UserService.GetUserLogged,
  })
}
