import axios from 'axios'
import type { ApiErrorCode, ApiErrorResponse } from './types'

export const apiErrorMessages: Record<ApiErrorCode, string> = {
  EMAIL_ALREADY_IN_USE: 'Este e-mail ja esta em uso.',
  FORBIDDEN: 'Voce nao tem permissao para realizar esta acao.',
  INTERNAL_SERVER_ERROR:
    'Erro interno no servidor. Tente novamente em instantes.',
  INVALID_CREDENTIALS: 'E-mail ou senha invalidos.',
  INVALID_MONTH: 'Mes invalido.',
  INVALID_YEAR: 'Ano invalido.',
  METHOD_NOT_ALLOWED: 'Metodo nao permitido para esta acao.',
  PAGE_OUT_OF_RANGE: 'Pagina fora do intervalo disponivel.',
  PASSWORD_TOO_SHORT: 'A senha deve ter pelo menos 8 caracteres.',
  PRIVATE_WORKSPACE_CANNOT_HAVE_MEMBERS:
    'Workspaces privados nao podem receber membros.',
  TRANSACTION_NOT_FOUND: 'Transacao nao encontrada.',
  UNAUTHORIZED: 'Voce precisa estar autenticado.',
  UNKNOWN_ERROR: 'Erro desconhecido. Tente novamente.',
  USER_ALREADY_WORKSPACE_MEMBER: 'Este usuario ja e membro do workspace.',
  USER_CANNOT_REMOVE_SELF_FROM_WORKSPACE:
    'Voce nao pode remover a si mesmo do workspace.',
  USER_NOT_FOUND: 'Usuario nao encontrado.',
  USER_NOT_WORKSPACE_MEMBER: 'Voce nao e membro deste workspace.',
  VALIDATION_ERROR: 'Verifique os dados informados.',
  WORKSPACE_CREATION_FAILED:
    'Nao foi possivel criar o workspace. Tente novamente.',
  WORKSPACE_MEMBER_CREATION_FAILED:
    'Nao foi possivel adicionar o membro ao workspace.',
  WORKSPACE_MEMBER_NOT_FOUND: 'Membro do workspace nao encontrado.',
  WORKSPACE_MEMBER_ROLE_NOT_FOUND: 'Papel do membro nao encontrado.',
  WORKSPACE_NAME_ALREADY_EXISTS: 'Ja existe um workspace com este nome.',
  WORKSPACE_NOT_FOUND: 'Workspace nao encontrado.',
  WORKSPACE_OWNER_CANNOT_BE_REMOVED:
    'O proprietario do workspace nao pode ser removido.',
  WORKSPACE_OWNER_ROLE_IMMUTABLE:
    'O papel do proprietario original do workspace nao pode ser alterado.',
}

export type NormalizedApiError = {
  status?: number
  code: ApiErrorCode | 'CLIENT_ERROR'
  message: string
  originalMessage?: string
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return {
      code: 'CLIENT_ERROR',
      message: 'Erro inesperado. Tente novamente.',
    }
  }

  const status = error.response?.status
  const apiError = error.response?.data

  if (apiError?.code && apiError.code in apiErrorMessages) {
    return {
      status,
      code: apiError.code,
      message: apiErrorMessages[apiError.code],
      originalMessage: apiError.message,
    }
  }

  if (status === 401) {
    return {
      status,
      code: 'UNAUTHORIZED',
      message: apiErrorMessages.UNAUTHORIZED,
      originalMessage: apiError?.message,
    }
  }

  if (status === 403) {
    return {
      status,
      code: 'FORBIDDEN',
      message: apiErrorMessages.FORBIDDEN,
      originalMessage: apiError?.message,
    }
  }

  if (status && status >= 500) {
    return {
      status,
      code: 'INTERNAL_SERVER_ERROR',
      message: apiErrorMessages.INTERNAL_SERVER_ERROR,
      originalMessage: apiError?.message,
    }
  }

  return {
    status,
    code: 'UNKNOWN_ERROR',
    message: apiErrorMessages.UNKNOWN_ERROR,
    originalMessage: apiError?.message,
  }
}
