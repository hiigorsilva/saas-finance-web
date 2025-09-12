import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  type WorkspaceSearchFilterType,
  workspaceSearchFilterSchema,
} from '@/schemas/workspace-search-form-filter'

export function WorkspaceSearchFilterForm() {
  const form = useForm<WorkspaceSearchFilterType>({
    resolver: zodResolver(workspaceSearchFilterSchema),
    defaultValues: {
      searchWorkspace: '',
    },
  })

  const onSubmit = (data: WorkspaceSearchFilterType) => {
    console.log('SEARCH', data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="searchWorkspace"
          render={({ field }) => (
            <FormItem className="relative flex flex-col gap-0">
              <FormLabel className="sr-only">Buscar Workspaces</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                  <Input
                    className="pl-0 pr-3 shadow-none border-0 focus-visible:border-0 focus-visible:ring-0"
                    placeholder="Buscar Workspaces..."
                    autoComplete="off"
                    {...field}
                  />
                  <SearchIcon
                    className="size-5 text-muted-foreground"
                    strokeWidth={1}
                  />
                </div>
              </FormControl>
              <FormMessage className="absolute -bottom-5 left-0" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
