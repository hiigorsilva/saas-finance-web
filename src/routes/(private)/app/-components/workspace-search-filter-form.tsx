import { SearchInput } from '@/components/ui/search-input'

type WorkspaceSearchFilterFormProps = {
  searchValue: string
  onSearchChange: (value: string) => void
}

export function WorkspaceSearchFilterForm({
  searchValue,
  onSearchChange,
}: WorkspaceSearchFilterFormProps) {
  return (
    <div className="flex items-center gap-6">
      <SearchInput
        label="Buscar Workspaces"
        placeholder="Buscar Workspaces..."
        value={searchValue}
        onValueChange={onSearchChange}
      />
    </div>
  )
}
