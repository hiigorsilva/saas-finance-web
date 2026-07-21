import type { RoleMemberWorkspaceValuesType } from '@/data/labels/role-member-workspace'
import type { WorkspaceType } from '@/data/labels/workspace-type'

export interface IWorkspaceDetails {
  id: string
  slug: string
  name: string
  description: string
  type: WorkspaceType
  ownerId: string
  createdAt: string
  updatedAt: string
  totalMembers: number
  ownerName: string
  members: IMembersOfWorkspace[]
}

export interface IMembersOfWorkspace {
  id: string
  userId: string
  workspaceId: string
  role: RoleMemberWorkspaceValuesType
  joinedAt: string
  userName: string
  userEmail: string
}

export interface IWorkspace {
  id: string
  ownerId: string
  name: string
  slug: string
  description: string
  type: WorkspaceType
  createdAt: string
  updatedAt: string
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
