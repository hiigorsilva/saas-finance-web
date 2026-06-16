import type { RoleMemberWorkspaceValuesType } from '@/data/labels/role-member-workspace'
import type { WorkspaceType } from '@/data/labels/workspace-type'

export interface IWorkspace {
  id: string
  name: string
  description: string
  type: WorkspaceType
}

export interface IWorkspaceMember {
  id: string
  workspaceId: string
  userId: string
  role: RoleMemberWorkspaceValuesType
}

export type AddMemberToWorkspacePayload = {
  workspaceId: string
  email: string
  role: RoleMemberWorkspaceValuesType
}

export type UpdateMemberToWorkspacePayload = {
  workspaceId: string
  memberId: string
  role: RoleMemberWorkspaceValuesType
}

export interface IMemberOfWorkspace {
  id: string
  name: string
  email: string
  role: RoleMemberWorkspaceValuesType
  financialProfile: string
  createdAt: string
  updatedAt: string
}
