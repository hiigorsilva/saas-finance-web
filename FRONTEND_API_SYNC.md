# Frontend API Sync Guide

Este documento descreve o que o frontend precisa implementar para ficar em sincronia com o contrato atual da API.

Stack considerada no frontend:

- React
- TypeScript
- Axios
- TanStack Query
- Tailwind CSS
- shadcn/ui
- pnpm

## Dependencias no Frontend

Instale as dependencias de dados/requisicoes com pnpm:

```bash
pnpm add axios @tanstack/react-query
```

Se ainda nao tiver o shadcn/ui configurado, siga o setup oficial do projeto frontend e use o componente de toast/sonner escolhido por la para exibir as mensagens normalizadas.

## Contrato de Responses

### Sucesso comum

Toda response comum retorna:

```ts
type ApiResponse<T> = {
  data: T
}
```

Exemplo:

```json
{
  "data": {
    "accessToken": "jwt_token"
  }
}
```

### Sucesso paginado

Toda response paginada retorna:

```ts
type ApiPaginatedResponse<T> = {
  data: T[]
  props: {
    totalCount: number
    totalPages: number
    currentPage: number
    limit: number
  }
}
```

Exemplo:

```json
{
  "data": [],
  "props": {
    "totalCount": 0,
    "totalPages": 1,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Erro

Toda response de erro retorna:

```ts
type ApiErrorResponse = {
  message: string
  code: ApiErrorCode
}
```

Exemplo:

```json
{
  "message": "Invalid credentials.",
  "code": "INVALID_CREDENTIALS"
}
```

O status HTTP deve ser lido pelo Axios em `error.response.status`. O texto exibido ao usuario deve ser traduzido no frontend a partir de `code`.

## Tipos Base Recomendados

Crie algo como `src/services/api/types.ts` no frontend:

```ts
export type ApiResponse<T> = {
  data: T
}

export type ApiPaginatedResponse<T> = {
  data: T[]
  props: {
    totalCount: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export type ApiErrorCode =
  | 'EMAIL_ALREADY_IN_USE'
  | 'FORBIDDEN'
  | 'INTERNAL_SERVER_ERROR'
  | 'INVALID_CREDENTIALS'
  | 'INVALID_MONTH'
  | 'INVALID_YEAR'
  | 'METHOD_NOT_ALLOWED'
  | 'PAGE_OUT_OF_RANGE'
  | 'PASSWORD_TOO_SHORT'
  | 'PRIVATE_WORKSPACE_CANNOT_HAVE_MEMBERS'
  | 'TRANSACTION_NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'UNKNOWN_ERROR'
  | 'USER_ALREADY_WORKSPACE_MEMBER'
  | 'USER_CANNOT_REMOVE_SELF_FROM_WORKSPACE'
  | 'USER_NOT_FOUND'
  | 'USER_NOT_WORKSPACE_MEMBER'
  | 'VALIDATION_ERROR'
  | 'WORKSPACE_CREATION_FAILED'
  | 'WORKSPACE_MEMBER_CREATION_FAILED'
  | 'WORKSPACE_MEMBER_NOT_FOUND'
  | 'WORKSPACE_MEMBER_ROLE_NOT_FOUND'
  | 'WORKSPACE_NAME_ALREADY_EXISTS'
  | 'WORKSPACE_NOT_FOUND'
  | 'WORKSPACE_OWNER_CANNOT_BE_REMOVED'
  | 'WORKSPACE_OWNER_ROLE_IMMUTABLE'

export type ApiErrorResponse = {
  message: string
  code: ApiErrorCode
}
```

## Axios

Crie uma instancia compartilhada, por exemplo `src/services/api/client.ts`:

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
```

Se o projeto usar cookies httpOnly no futuro, remova o `localStorage` e use `withCredentials`.

## Traducao de Erros

Crie um mapeamento central, por exemplo `src/services/api/errors.ts`:

```ts
import axios from 'axios'
import type { ApiErrorCode, ApiErrorResponse } from './types'

export const apiErrorMessages: Record<ApiErrorCode, string> = {
  EMAIL_ALREADY_IN_USE: 'Este e-mail ja esta em uso.',
  FORBIDDEN: 'Voce nao tem permissao para realizar esta acao.',
  INTERNAL_SERVER_ERROR: 'Erro interno no servidor. Tente novamente em instantes.',
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
```

Use `message` normalizada na interface. Guarde `originalMessage` apenas para log/debug se fizer sentido.

## TanStack Query

Configure um `QueryClient` central:

```ts
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
    },
    mutations: {
      retry: false,
      onError: error => {
        const apiError = normalizeApiError(error)

        // Exemplo com shadcn/ui toast:
        // toast({
        //   title: 'Nao foi possivel concluir a acao',
        //   description: apiError.message,
        //   variant: 'destructive',
        // })
      },
    },
  },
})
```

Para formularios, prefira tratar `onError` localmente para exibir mensagens perto dos campos quando fizer sentido.

## Exemplo de Service

```ts
import { api } from '@/services/api/client'
import type { ApiResponse } from '@/services/api/types'

type SignInInput = {
  email: string
  password: string
}

type SignInOutput = {
  accessToken: string
}

export async function signIn(input: SignInInput) {
  const response = await api.post<ApiResponse<SignInOutput>>('/signin', input)
  return response.data.data
}
```

Exemplo paginado:

```ts
import { api } from '@/services/api/client'
import type { ApiPaginatedResponse } from '@/services/api/types'

type Workspace = {
  id: string
  name: string
  description: string | null
  type: string
}

export async function listWorkspaces(page = 1, limit = 10) {
  const response = await api.get<ApiPaginatedResponse<Workspace>>('/workspace', {
    params: { page, limit },
  })

  return response.data
}
```

## Autenticacao

Rotas protegidas exigem:

```http
Authorization: Bearer <accessToken>
```

Endpoints de auth retornam:

```ts
type AuthResponse = {
  accessToken: string
}
```

Recomendacao:

- Ao receber `UNAUTHORIZED`, redirecione para login e limpe o token local.
- Ao receber `FORBIDDEN`, mantenha a sessao e mostre mensagem de permissao.
- Nao traduza usando `message` da API como chave. Use sempre `code`.

## Mapeamento Atual dos Erros

Este mapeamento pode ser usado pelo frontend sem problema de seguranca. Os codigos sao contratos publicos da API, nao revelam dados sensiveis. Apenas evite exibir detalhes internos de erros `INTERNAL_SERVER_ERROR`, `UNKNOWN_ERROR`, `WORKSPACE_CREATION_FAILED` e `WORKSPACE_MEMBER_CREATION_FAILED`; use mensagens genericas para o usuario.

| Code | Status comum | Significado | Mensagem sugerida pt-BR |
| --- | --- | --- | --- |
| `EMAIL_ALREADY_IN_USE` | 409 | E-mail ja cadastrado | Este e-mail ja esta em uso. |
| `FORBIDDEN` | 403 | Usuario autenticado sem permissao para a acao | Voce nao tem permissao para realizar esta acao. |
| `INTERNAL_SERVER_ERROR` | 500 | Erro inesperado no servidor | Erro interno no servidor. Tente novamente em instantes. |
| `INVALID_CREDENTIALS` | 401 | E-mail ou senha invalidos | E-mail ou senha invalidos. |
| `INVALID_MONTH` | 400 | Mes invalido no dashboard | Mes invalido. |
| `INVALID_YEAR` | 400 | Ano invalido no dashboard | Ano invalido. |
| `METHOD_NOT_ALLOWED` | 405 | Metodo HTTP sem regra de permissao | Metodo nao permitido para esta acao. |
| `PAGE_OUT_OF_RANGE` | 400 | Pagina solicitada fora do intervalo | Pagina fora do intervalo disponivel. |
| `PASSWORD_TOO_SHORT` | 400 | Senha menor que o minimo aceito | A senha deve ter pelo menos 8 caracteres. |
| `PRIVATE_WORKSPACE_CANNOT_HAVE_MEMBERS` | 403 | Workspace privado nao aceita membros | Workspaces privados nao podem receber membros. |
| `TRANSACTION_NOT_FOUND` | 404 | Transacao nao encontrada | Transacao nao encontrada. |
| `UNAUTHORIZED` | 401 | Token ausente, invalido ou usuario nao autenticado | Voce precisa estar autenticado. |
| `UNKNOWN_ERROR` | 400/500 | Erro nao classificado | Erro desconhecido. Tente novamente. |
| `USER_ALREADY_WORKSPACE_MEMBER` | 409 | Usuario ja pertence ao workspace | Este usuario ja e membro do workspace. |
| `USER_CANNOT_REMOVE_SELF_FROM_WORKSPACE` | 403 | Usuario tentou remover a si mesmo do workspace | Voce nao pode remover a si mesmo do workspace. |
| `USER_NOT_FOUND` | 404 | Usuario nao encontrado | Usuario nao encontrado. |
| `USER_NOT_WORKSPACE_MEMBER` | 403 | Usuario autenticado nao pertence ao workspace | Voce nao e membro deste workspace. |
| `VALIDATION_ERROR` | 400 | Body, params ou query invalidos | Verifique os dados informados. |
| `WORKSPACE_CREATION_FAILED` | 500 | Falha interna ao criar workspace | Nao foi possivel criar o workspace. Tente novamente. |
| `WORKSPACE_MEMBER_CREATION_FAILED` | 500 | Falha interna ao adicionar membro | Nao foi possivel adicionar o membro ao workspace. |
| `WORKSPACE_MEMBER_NOT_FOUND` | 404 | Membro nao encontrado no workspace | Membro do workspace nao encontrado. |
| `WORKSPACE_MEMBER_ROLE_NOT_FOUND` | 404 | Role do membro nao encontrada | Papel do membro nao encontrado. |
| `WORKSPACE_NAME_ALREADY_EXISTS` | 409 | Nome de workspace duplicado para o usuario | Ja existe um workspace com este nome. |
| `WORKSPACE_NOT_FOUND` | 404 | Workspace nao encontrado | Workspace nao encontrado. |
| `WORKSPACE_OWNER_CANNOT_BE_REMOVED` | 403 | Tentativa de remover o owner | O proprietario do workspace nao pode ser removido. |
| `WORKSPACE_OWNER_ROLE_IMMUTABLE` | 403 | Tentativa de alterar o papel do owner original | O papel do proprietario original do workspace nao pode ser alterado. |

## Checklist para Implementar no Frontend

1. Criar os tipos `ApiResponse`, `ApiPaginatedResponse`, `ApiErrorCode` e `ApiErrorResponse`.
2. Criar uma instancia Axios com `baseURL` e interceptor de token.
3. Criar `apiErrorMessages` com traducao pt-BR por `code`.
4. Criar `normalizeApiError`.
5. Integrar `normalizeApiError` em mutations/queries do TanStack Query.
6. Usar `toast` do shadcn/ui para erros globais.
7. Usar erros locais em formularios quando a acao for especifica.
8. Tratar `UNAUTHORIZED` limpando token e redirecionando para login.
9. Tratar `FORBIDDEN` sem deslogar o usuario.
10. Nao depender de `message` da API para traducao final.
