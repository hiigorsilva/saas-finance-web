import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type BadgeTagInfoProps = ComponentProps<'div'>
export function BadgeTagInfo({
  className,
  children,
  ...props
}: BadgeTagInfoProps) {
  return (
    <div
      className={cn(
        'w-fit h-fit flex justify-start items-center gap-2 border rounded-sm px-2 py-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
