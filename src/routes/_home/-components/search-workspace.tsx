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
  type SearchWorkspaceFormType,
  searchWorkspaceForm,
} from '@/schemas/search-workspace'

export function SearchWorkspace() {
  const form = useForm<SearchWorkspaceFormType>({
    resolver: zodResolver(searchWorkspaceForm),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = (search: SearchWorkspaceFormType) => {
    console.log('SEARCH', search)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Título do workspace</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md pr-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-[2px]">
                  <Input
                    className="border-0 focus-visible:border-0 focus-visible:ring-0"
                    placeholder="Buscar workspaces"
                    type="text"
                    {...field}
                  />
                  <SearchIcon
                    className="size-5 text-muted-foreground"
                    strokeWidth={1}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
