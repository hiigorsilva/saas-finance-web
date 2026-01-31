import { HeartHandshakeIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import type { WorkspaceInvitationType } from '@/data/requests/workspace-invitations'

type WorkspaceNotificationItemProps = {
  workspaceInvitations: WorkspaceInvitationType
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function WorkspaceNotificationItem({
  workspaceInvitations,
  setIsOpen,
}: WorkspaceNotificationItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { inviterName, workspaceName, id } = workspaceInvitations

  const handleAcceptInvitation = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('INVITE_ACCEPTED:', id)
      toast.success('Convite aceito com sucesso!')
    } catch (error) {
      console.error('ACCEPT_INVITATION_ERROR:', error)
      toast.error('Erro ao aceitar o convite. Tente novamente.')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const handeDeclineInvitation = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('INVITE_DECLINED:', id)
      toast.success('Convite recusado com sucesso!')
    } catch (error) {
      console.error('DECLINE_INVITATION_ERROR:', error)
      toast.error('Erro ao recusar o convite. Tente novamente.')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <DropdownMenuItem
      className="items-start"
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {/* ICON */}
      <div className="rounded-md p-2 bg-primary/10 border border-primary/25">
        <HeartHandshakeIcon
          className="size-5 shrink-0 text-primary"
          strokeWidth={1}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3">
        {/* DETAILS */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base text-foreground leading-none">
            Convite para workspace
          </h3>
          <p className="text-sm text-muted-foreground text-wrap line-clamp-2 truncate">
            {inviterName} te convidou para integrar-se ao worksapce{' '}
            <strong className="font-semibold text-sm text-muted-foreground uppercase">
              {workspaceName}
            </strong>
          </p>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 items-center gap-4">
          <Button
            className="rounded"
            variant="gradient"
            size="sm"
            disabled={isLoading}
            onClick={() => handleAcceptInvitation(id)}
          >
            Aceitar
          </Button>

          <Button
            className="rounded"
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => handeDeclineInvitation(id)}
          >
            Recusar
          </Button>
        </div>
      </div>
    </DropdownMenuItem>
  )
}
