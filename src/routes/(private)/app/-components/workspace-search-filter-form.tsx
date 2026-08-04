import { SearchIcon } from 'lucide-react'
import { useId } from 'react'
import { Input } from '@/components/ui/input'

type WorkspaceSearchFilterFormProps = {
  value: string
  onSearchChange: (value: string) => void
}

export function WorkspaceSearchFilterForm({
  value,
  onSearchChange,
}: WorkspaceSearchFilterFormProps) {
  const inputId = useId()

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex flex-col gap-0 min-w-52 w-fit">
        <label className="sr-only" htmlFor={inputId}>
          Buscar Workspaces
        </label>

        <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-2">
          <Input
            id={inputId}
            className="pl-0 pr-3 shadow-none border-0 focus-visible:border-0 focus-visible:ring-0"
            placeholder="Buscar Workspaces..."
            autoComplete="off"
            value={value}
            onChange={event => onSearchChange(event.target.value)}
          />

          <SearchIcon
            className="size-5 text-muted-foreground"
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  )
}
