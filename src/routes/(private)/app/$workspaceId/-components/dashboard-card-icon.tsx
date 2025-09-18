import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type DashboardCardIconProps = ComponentProps<'div'>

export function DashboardCardIcon({
  children,
  className,
}: DashboardCardIconProps) {
  return (
    <div
      className={cn(
        'w-fit h-fit p-1.5 rounded-md bg-primary/10 border border-primary/25',
        className
      )}
    >
      {children}
    </div>
  )
}
