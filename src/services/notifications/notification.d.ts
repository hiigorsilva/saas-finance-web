export interface IInviteToWorkspace {
  id: string
  workspaceId: string
  workspaceName: string
  inviterId: string
  inviterName: string
  inviteeId: string
  status: string
  expiresAt: string
}
