type WORKSPACE_TYPE = 'PRIVATE' | 'SHARED'

const workspaces = [
  {
    id: new Date().toISOString(),
    name: 'Buncker',
    description:
      'Controle pessoal das minhas finanças, contemplando receitas, despesas e investimentos.',
    type: 'PRIVATE' as WORKSPACE_TYPE,
  },
  {
    id: new Date().toISOString(),
    name: 'Nossa Casa',
    description: 'Gerenciamento e planejamento das finanças de casa.',
    type: 'SHARED' as WORKSPACE_TYPE,
  },
  {
    id: new Date().toISOString(),
    name: 'Viagem com os Buscapé',
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
