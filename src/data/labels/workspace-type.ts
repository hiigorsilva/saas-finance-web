export const WORKSPACE_TYPE = {
  PRIVATE: 'PRIVATE',
  SHARED: 'SHARED',
} as const

export const WORKSPACE_LABELS = {
  [WORKSPACE_TYPE.PRIVATE]: 'Privado',
  [WORKSPACE_TYPE.SHARED]: 'Compartilhado',
}

export const WORKSPACE_VALUES = Object.values(WORKSPACE_TYPE)

export type WorkspaceType = (typeof WORKSPACE_TYPE)[keyof typeof WORKSPACE_TYPE]
