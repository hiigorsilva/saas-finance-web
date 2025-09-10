import { HeartHandshakeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function WorkspaceNotificationItem() {
  return (
    <DropdownMenuItem className="items-start">
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
            Higor Silva te convidou para integrar-se ao worksapce{' '}
            <strong className="font-semibold text-sm text-muted-foreground uppercase">
              Nexus Brand
            </strong>
          </p>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 items-center gap-4">
          <Button className="rounded" variant="gradient" size="sm">
            Aceitar
          </Button>

          <Button className="rounded" variant="outline" size="sm">
            Recusar
          </Button>
        </div>
      </div>
    </DropdownMenuItem>
  )
}
