import { QueryClient } from '@tanstack/react-query'
import { normalizeApiError } from '@/services/api/errors'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const apiError = normalizeApiError(error)

        if (apiError.status === 401 || apiError.status === 403) {
          return false
        }

        return failureCount < 2
      },
      refetchOnWindowFocus: false, // desabilita o refetch automático ao voltar para a aba do navegador
      refetchOnReconnect: true, // habilita o refetch automático ao reconectar à internet
    },
    mutations: {
      retry: false,
    },
  },
})
