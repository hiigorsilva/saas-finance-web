import { NotepadTextIcon } from 'lucide-react'

export function WorkspaceNotificationEmpty() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 py-16 px-8">
      <NotepadTextIcon
        className="size-8 shrink-0 text-muted-foreground"
        strokeWidth={1.5}
      />

      <span className="inline-flex text-sm text-center text-muted-foreground text-pretty">
        Você não tem nenhuma notificação
      </span>
    </div>
  )
}
