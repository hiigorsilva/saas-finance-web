import {
  type QueryClient,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { UserService } from '@/services/user/user'

export const userLoggedQueryKey = ['user', 'logged'] as const

export async function prefetchUserLoggedQuery(queryClient: QueryClient) {
  await queryClient.fetchQuery({
    queryKey: userLoggedQueryKey,
    queryFn: UserService.GetUserLogged,
  })
}

export async function refreshUserLoggedQuery(queryClient: QueryClient) {
  await queryClient.invalidateQueries({
    queryKey: userLoggedQueryKey,
  })
}

export async function clearUserLoggedQuery(queryClient: QueryClient) {
  await queryClient.cancelQueries({
    queryKey: userLoggedQueryKey,
  })

  queryClient.removeQueries({
    queryKey: userLoggedQueryKey,
  })
}

export function useUserLoggedQuery() {
  return useQuery({
    queryKey: userLoggedQueryKey,
    queryFn: UserService.GetUserLogged,
    staleTime: 1000 * 60 * 10, // 10 min
    gcTime: 1000 * 60 * 30, // 30 min
  })
}

export function useRefreshUserLoggedQuery() {
  const queryClient = useQueryClient()

  return async () => refreshUserLoggedQuery(queryClient)
}
