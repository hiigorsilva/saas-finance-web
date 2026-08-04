import { SearchIcon } from 'lucide-react'
import { type ComponentProps, useId } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type SearchInputProps = Omit<
  ComponentProps<typeof Input>,
  'id' | 'value' | 'onChange'
> & {
  value: string
  label: string
  onValueChange: (value: string) => void
  wrapperClassName?: string
}

export function SearchInput({
  value,
  label,
  onValueChange,
  className,
  wrapperClassName,
  ...props
}: SearchInputProps) {
  const inputId = useId()

  return (
    <div
      className={cn(
        'relative flex flex-col gap-0 min-w-52 w-fit',
        wrapperClassName
      )}
    >
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>

      <div className="flex items-center border rounded-md px-3 has-[input:focus-within]:border-ring has-[input:focus-within]:ring-ring/50 has-[input:focus-within]:ring-2">
        <Input
          id={inputId}
          className={cn(
            'pl-0 pr-3 shadow-none border-0 focus-visible:border-0 focus-visible:ring-0',
            className
          )}
          autoComplete="off"
          value={value}
          onChange={event => onValueChange(event.target.value)}
          {...props}
        />

        <SearchIcon className="size-5 text-muted-foreground" strokeWidth={1} />
      </div>
    </div>
  )
}
