import { HeartHandshakeIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import type { IInviteToWorkspace } from '@/services/notifications/notification.d'
import { dateFormatDistanceToNow } from '@/utils/date-format'

type WorkspaceNotificationItemProps = {
  invite: IInviteToWorkspace
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function WorkspaceNotificationItem({
  invite,
  setIsOpen,
}: WorkspaceNotificationItemProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAcceptInvitation = async (inviteId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('INVITE_ACCEPTED:', inviteId)
      toast.success('Convite aceito com sucesso!')
    } catch (error) {
      console.error('ACCEPT_INVITATION_ERROR:', error)
      toast.error('Erro ao aceitar o convite. Tente novamente.')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const handeDeclineInvitation = async (inviteId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('INVITE_DECLINED:', inviteId)
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
          <div className="flex justify-between items-center gap-1">
            <h3 className="font-semibold text-base text-foreground leading-none">
              Novo convite
            </h3>

            <div className="w-fit text-xs text-muted-foreground leading-none px-2 py-1 rounded-full border">
              Expira {dateFormatDistanceToNow(invite.expiresAt)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-wrap line-clamp-2 truncate">
            {invite.inviterName} te convidou para integrar-se ao workspace{' '}
            <strong className="font-semibold text-sm text-muted-foreground uppercase">
              {invite.workspaceName}
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
            onClick={() => handleAcceptInvitation(invite.id)}
          >
            Aceitar
          </Button>

          <Button
            className="rounded"
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={() => handeDeclineInvitation(invite.id)}
          >
            Recusar
          </Button>
        </div>
      </div>
    </DropdownMenuItem>
  )
}
