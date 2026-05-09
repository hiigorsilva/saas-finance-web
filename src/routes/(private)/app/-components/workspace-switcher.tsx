import { useNavigate } from '@tanstack/react-router'
import {
  ChevronRightIcon,
  ChevronsUpDownIcon,
  FolderOpenIcon,
  PlusIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
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
import { Separator } from '@/components/ui/separator'
import { WorkspaceService } from '@/services/workspace/workspace'
import type { IWorkspace } from '@/services/workspace/workspace.d'
import type { IPaginateResponse } from '@/utils/http'
import { AddWorkspaceButton } from './add-workspace-button'

export function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false)

  const [workspaces, setWorkspaces] = useState<IPaginateResponse<IWorkspace>>({
    data: [],
    currentPage: 0,
    limit: 0,
    totalCount: 0,
    totalPages: 0,
  })

  const initialValue = workspaces.totalCount > 0 ? workspaces.data[0].id : ''
  const [workspaceActive, setWorkspaceActive] = React.useState(initialValue)

  const route = useNavigate()

  async function fetchData() {
    try {
      const res = await WorkspaceService.GetWorkspace(1, 20)
      if (res.status === 200 || res.status === 204) {
        const { data, currentPage, limit, totalCount, totalPages } =
          res.data.body
        setWorkspaces({
          data: data,
          currentPage: currentPage,
          limit: limit,
          totalCount: totalCount,
          totalPages: totalPages,
        })
      }
    } catch (_error) {
      toast.error('Erro ao buscar workspaces. Por favor, tente novamente.')
    }
  }

  const handleRedirectToDashboard = (currentWorkspace: string) => {
    route({
      to: `/app/${currentWorkspace}`,
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-40 w-fit justify-between text-foreground"
        >
          {workspaceActive
            ? workspaces.data.find(
                workspace => workspace.id === workspaceActive
              )?.name
            : 'Selecionar Workspace'}
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="min-w-80 w-fit">
        <Command className="p-0">
          <CommandInput placeholder="Buscar..." />

          <CommandList className="p-0">
            <CommandEmpty asChild>
              <div className="flex flex-col items-center gap-1">
                <FolderOpenIcon
                  className="size-6 shrink-0 text-muted-foreground"
                  strokeWidth={1}
                />
                <span className="text-sm text-muted-foreground">
                  Nenhum workspace encontrado
                </span>
              </div>
            </CommandEmpty>

            {/* HEADER */}
            <div className="flex justify-between items-center gap-6 py-4">
              <h2 className="text-xs text-muted-foreground uppercase tracking-widest">
                Workspaces
              </h2>

              <div className="bg-primary/10 rounded-full border border-primary/25 px-3 py-1">
                <span className="block text-xs uppercase text-primary leading-none tracking-widest">
                  {workspaces.totalCount}{' '}
                  {workspaces.totalCount <= 1 ? 'Item' : 'Itens'}
                </span>
              </div>
            </div>

            <CommandGroup className="p-0">
              {workspaces.data.map(workspace => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.id}
                  onSelect={currentWorkspace => {
                    setWorkspaceActive(
                      currentWorkspace === workspaceActive
                        ? workspaceActive
                        : currentWorkspace
                    )
                    handleRedirectToDashboard(currentWorkspace)
                    setOpen(false)
                  }}
                  className="w-full justify-between bg-transparent p-0"
                >
                  <Button
                    className="w-full justify-start bg-background px-0 hover:px-2"
                    variant="ghost"
                  >
                    {/* ICON */}
                    <div className="w-fit h-fit rounded-md bg-primary/10 border border-primary/25 p-2">
                      {workspace.type === 'PRIVATE' && (
                        <UserIcon
                          className="size-5 shrink-0 text-primary"
                          strokeWidth={1}
                        />
                      )}

                      {workspace.type === 'SHARED' && (
                        <UsersIcon
                          className="size-5 shrink-0 text-primary"
                          strokeWidth={1}
                        />
                      )}
                    </div>

                    {/* WORKSPACE */}
                    <div className="w-full flex flex-col justify-center items-start">
                      <h3 className="font-semibold text-foreground">
                        {workspace.name}
                      </h3>
                      <span className="inline-block font-normal text-sm text-muted-foreground">
                        {workspace.type === 'PRIVATE' && 'Somente você'}
                        {workspace.type === 'SHARED' && 'X usuários'}
                      </span>
                    </div>

                    {/* ICON SECONDARY */}
                    <ChevronRightIcon
                      className="size-4 shrink-0 text-muted-foreground"
                      strokeWidth={1.5}
                    />
                  </Button>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <Separator className="mt-2 mb-4" />

          <AddWorkspaceButton onFetchData={fetchData}>
            <Button className="w-full" variant="gradient">
              <PlusIcon className="size-5 shrink-0 text-foreground" />
              <span className="font-semibold text-foreground">
                Novo Workspace
              </span>
            </Button>
          </AddWorkspaceButton>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
