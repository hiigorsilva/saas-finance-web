import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

type TitleIconPageProps = ComponentProps<'button'> & {
  handleNavigateBack: () => void
}

export function TitleIconPage({
  handleNavigateBack,
  children,
  className,
  ...props
}: TitleIconPageProps) {
  return (
    <Button
      {...props}
      className={cn('', className)}
      variant="ghost"
      size="icon"
      onClick={handleNavigateBack}
    >
      {children}
    </Button>
  )
}
