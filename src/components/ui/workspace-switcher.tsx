import {
  ChevronsUpDownIcon,
  FolderOpenIcon,
  LockIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export type WORKSPACE_TYPE = Array<{
  id: string
  title: string
  description: string
  type: 'PRIVATE' | 'SHARED'
}>

const workspaces: WORKSPACE_TYPE = [
  {
    id: String(Date.now()),
    title: 'Buncker',
    description: 'Controle pessoal',
    type: 'PRIVATE',
  },
  {
    id: String(Date.now() + 5),
    title: 'Nossa Casa',
    description: 'Controle pessoal',
    type: 'SHARED',
  },
  {
    id: String(Date.now() * 2),
    title: 'Viagem para Gramado',
    description: 'Central de despesas da viagem',
    type: 'SHARED',
  },
]

const result = {
  statusCode: 200,
  body: {
    data: workspaces,
    totalCount: workspaces.length,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },
}

export function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="min-w-40 w-fit min-h-10 h-fit">
        <Button
          variant="outline"
          className="flex justify-between items-center gap-3 w-full"
        >
          {value
            ? result.body.data.find(workspace => workspace.id === value)?.title
            : 'Selecionar Workspace'}
          <ChevronsUpDownIcon
            className="size-4 shrink-0 text-foreground"
            strokeWidth={1}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="min-w-80 w-fit">
        <Command>
          <CommandInput placeholder="Buscar..." />

          <CommandList>
            <CommandEmpty asChild>
              <div className="flex flex-col justify-center items-center gap-1">
                <FolderOpenIcon
                  className="size-6 shrink-0 text-muted-foreground"
                  strokeWidth={1}
                />
                <span className="text-xs text-muted-foreground text-pretty">
                  Nenhum workspace encontrado
                </span>
              </div>
            </CommandEmpty>

            <div className="flex justify-between items-center gap-6 py-2">
              <h2 className="text-xs text-muted-foreground uppercase tracking-widest">
                Workspaces
              </h2>

              <div className="bg-primary/10 rounded-full border border-primary/25 px-3 py-1">
                <span className="block text-xs uppercase text-primary leading-none tracking-widest">
                  {result.body.totalCount}{' '}
                  {result.body.totalCount <= 1 ? 'Item' : 'Itens'}
                </span>
              </div>
            </div>

            <CommandGroup>
              {result.body.data.map(workspace => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.id}
                  onSelect={currentWorkspace => {
                    setValue(currentWorkspace === value ? '' : currentWorkspace)
                    setOpen(false)
                  }}
                  className="bg-transparent"
                >
                  <div className="bg-primary/10 border border-primary/25 p-2 rounded-lg">
                    {workspace.type === 'PRIVATE' && (
                      <UserIcon
                        className="size-6 shrink-0 text-primary"
                        strokeWidth={1}
                      />
                    )}
                    {workspace.type === 'SHARED' && (
                      <UsersIcon
                        className="size-6 shrink-0 text-primary"
                        strokeWidth={1}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-foreground leading-none tracking-tight">
                      {workspace.title}
                    </h3>
                    <span className="text-xs text-muted-foreground leading-none tracking-tight">
                      {workspace.type === 'PRIVATE' && (
                        <div className="flex justify-start items-start gap-1">
                          <LockIcon
                            className="size-3 shrink-0 text-muted-foreground"
                            strokeWidth={1}
                          />
                          <span>Somente você</span>
                        </div>
                      )}
                      {workspace.type === 'SHARED' && 'X usuários'}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
