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
      className={cn(
        'flex-1 max-w-7xl w-full mx-auto border-8 border-red-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
