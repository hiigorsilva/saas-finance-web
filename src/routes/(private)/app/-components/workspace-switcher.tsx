import { useLocation, useNavigate } from '@tanstack/react-router'
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
import { WORKSPACE_TYPE } from '@/data/labels/workspace-type'
import { useWorkspacesQuery } from '@/hooks/queries/use-workspaces-query'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { normalizeApiError } from '@/services/api/errors'
import { validateSearchTerm } from '@/utils/search'
import { SkeletonHomePage } from '../../-components/skeleton-home-page'
import { AddWorkspaceButton } from './add-workspace-button'

export function WorkspaceSwitcher() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const searchWorkspaceValue = React.useMemo(
    () => location.search.search ?? '',
    [location.search.search]
  )

  const [searchWorkspace, setSearchWorkspace] = useState(searchWorkspaceValue)
  const debouncedSearchWorkspace = useDebouncedValue(searchWorkspace, 500)

  useEffect(() => {
    setSearchWorkspace(searchWorkspaceValue)
  }, [searchWorkspaceValue])

  useEffect(() => {
    const searchWorkspaceNormalized = validateSearchTerm(
      debouncedSearchWorkspace
    )

    if (searchWorkspaceNormalized === searchWorkspaceValue) return

    navigate({
      to: '.',
      search: prev => ({
        ...prev,
        search: searchWorkspaceNormalized,
      }),
      replace: true,
    })
  }, [debouncedSearchWorkspace, navigate, searchWorkspaceValue])

  const { data: workspaces, error } = useWorkspacesQuery(
    1,
    20,
    searchWorkspaceValue
  )

  const workspaceIdSelected = React.useMemo(() => {
    const [, app, workspaceId] = location.pathname.split('/')

    if (app !== 'app') {
      return null
    }

    return workspaceId ?? null
  }, [location.pathname])

  const workspaceSelectedName = workspaceIdSelected
    ? workspaces?.data.find(workspace => workspace.id === workspaceIdSelected)
        ?.name
    : undefined

  const handleRedirectToDashboard = (currentWorkspace: string) => {
    navigate({
      to: `/app/${currentWorkspace}`,
    })
  }

  useEffect(() => {
    if (!error) return

    const apiError = normalizeApiError(error)
    toast.error(apiError.message)
  }, [error])

  if (!workspaces) return <SkeletonHomePage />

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-40 w-fit justify-between text-foreground"
        >
          {workspaceSelectedName ?? 'Selecionar Workspace'}
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="min-w-80 w-fit">
        <Command className="p-0">
          <CommandInput
            placeholder="Buscar..."
            value={searchWorkspace}
            onValueChange={setSearchWorkspace}
          />

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
                  {workspaces.props.totalCount}{' '}
                  {workspaces.props.totalCount <= 1 ? 'Item' : 'Itens'}
                </span>
              </div>
            </div>

            <CommandGroup className="p-0">
              {workspaces.data.map(workspace => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.id}
                  onSelect={currentWorkspace => {
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
                      {workspace.type === WORKSPACE_TYPE.PRIVATE && (
                        <UserIcon
                          className="size-5 shrink-0 text-primary"
                          strokeWidth={1}
                        />
                      )}

                      {workspace.type === WORKSPACE_TYPE.SHARED && (
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
                        {workspace.type === WORKSPACE_TYPE.PRIVATE &&
                          'Somente você'}
                        {workspace.type === WORKSPACE_TYPE.SHARED &&
                          `${workspace.totalMembers} membro${workspace.totalMembers > 1 ? 's' : ''}`}
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

          <AddWorkspaceButton>
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
