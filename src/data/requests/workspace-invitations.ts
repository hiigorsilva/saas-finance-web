import type { WorkspaceInvitationStatusType } from '../labels/workspace-invitation'

export type WorkspaceInvitationType = {
  id: string
  workspaceId: string
  workspaceName: string
  inviterId: string
  inviterName: string
  inviteeId: string
  status: WorkspaceInvitationStatusType
  createdAt: Date
  expiresAt: Date
  acceptedAt: Date
  declinedAt: Date
}

const workspaceInvitation: WorkspaceInvitationType[] = [
  {
    id: 'invitation_id',
    workspaceId: 'buncker_id',
    workspaceName: 'Buncker',
    inviterId: 'user_id',
    inviterName: 'Higor Silva',
    inviteeId: 'user_id',
    status: 'PENDING',
    createdAt: new Date(),
    expiresAt: new Date('2025-11-11'),
    acceptedAt: new Date(),
    declinedAt: new Date(),
  },
  {
    id: 'invitation_id2',
    workspaceId: 'buncker_id2',
    workspaceName: 'PCC',
    inviterId: 'user_id2',
    inviterName: 'Marcola',
    inviteeId: 'user_id',
    status: 'PENDING',
    createdAt: new Date(),
    expiresAt: new Date('2025-11-11'),
    acceptedAt: new Date(),
    declinedAt: new Date(),
  },
]

export const workspaceInvitationsResponse = {
  statusCode: 200,
  body: {
    data: workspaceInvitation,
    totalCount: workspaceInvitation.length,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },
}
