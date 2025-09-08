import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = ComponentProps<'div'>

export const Screen = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div
      className={cn('flex flex-col min-h-dvh h-fit w-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}
