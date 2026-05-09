import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type TitlePageProps = ComponentProps<'h1'>

export function TitlePage({ children, className, ...props }: TitlePageProps) {
  return (
    <h1
      {...props}
      className={cn(
        'font-semibold text-2xl text-foreground leading-none tracking-tight',
        className
      )}
    >
      {children}
    </h1>
  )
}
