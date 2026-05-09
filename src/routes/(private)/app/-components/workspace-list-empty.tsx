import { FolderOpenIcon } from 'lucide-react'

export function WorkspaceListEmpty() {
  return (
    <div className="w-full flex flex-auto justify-center items-center">
      <div className="max-w-[400px] w-full flex flex-col items-center gap-4">
        <FolderOpenIcon
          className="size-16 shrink-0 text-muted-foreground/50"
          strokeWidth={1}
        />

        <p className="text-sm text-center text-muted-foreground/75 text-pretty">
          Você não tem nenhum workspace criado.
          <span className="inline-block">
            Crie um novo para poder registrar suas transações.
          </span>
        </p>
      </div>
    </div>
  )
}
