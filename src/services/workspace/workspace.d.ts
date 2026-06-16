export interface IWorkspace {
  id: string
  name: string
  description: string
  type: 'PRIVATE' | 'SHARED'
}

export enum MemberRolesType {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER',
  VIEWER = 'VIEWER',
}

export interface IWorkspaceMember {
  id: string
  workspaceId: string
  userId: string
  role: MemberRolesType
}

export type AddMemberToWorkspacePayload = {
  workspaceId: string
  email: string
  role: MemberRolesType
}
