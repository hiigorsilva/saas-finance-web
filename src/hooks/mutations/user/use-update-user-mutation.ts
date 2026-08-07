import { useMutation, useQueryClient } from '@tanstack/react-query'
import { userLoggedQueryKey } from '@/hooks/queries/use-user-logged-query'
import { UserService } from '@/services/user/user'
import type { IUserLogged } from '@/services/user/user.d'

type UpdateUserLoggedPayload = {
  payload: Partial<IUserLogged>
}

export const useUpdateUserLoggedMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ payload }: UpdateUserLoggedPayload) =>
      UserService.UpdateUserLogged(payload),
    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...userLoggedQueryKey, variables.payload.id],
      })
    },
  })
}
