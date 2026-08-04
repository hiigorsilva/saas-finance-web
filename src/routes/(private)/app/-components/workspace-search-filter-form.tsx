import { SearchInput } from '@/components/ui/search-input'

type WorkspaceSearchFilterFormProps = {
  value: string
  onSearchChange: (value: string) => void
}

export function WorkspaceSearchFilterForm({
  value,
  onSearchChange,
}: WorkspaceSearchFilterFormProps) {
  return (
    <div className="flex items-center gap-6">
      <SearchInput
        label="Buscar Workspaces"
        placeholder="Buscar Workspaces..."
        value={value}
        onValueChange={onSearchChange}
      />
    </div>
  )
}
