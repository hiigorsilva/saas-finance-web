export type WORKSPACE_TYPE = 'PRIVATE' | 'SHARED'

const workspaces = [
  {
    id: 'buncker_id',
    name: 'Buncker',
    description:
      'Controle pessoal das minhas finanças, contemplando receitas, despesas e investimentos.',
    type: 'PRIVATE' as WORKSPACE_TYPE,
  },
  {
    id: 'nossa_casa',
    name: 'Nossa Casa',
    description: 'Gerenciamento e planejamento das finanças de casa.',
    type: 'SHARED' as WORKSPACE_TYPE,
  },
  {
    id: 'viagem_buscape',
    name: 'Viagem Buscapé',
    description: 'Controle de gastos da viagem de férias da família Buscapé.',
    type: 'SHARED' as WORKSPACE_TYPE,
  },
]

export const workspaceResponse = {
  statusCode: 200,
  body: {
    data: workspaces,
    totalCount: workspaces.length,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },
}
