import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = ComponentProps<'div'>

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn('flex flex-col flex-1 max-w-7xl w-full mx-auto', className)}
      {...props}
    >
      {children}
    </div>
  )
}
