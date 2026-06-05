import { Loader2Icon } from 'lucide-react'

export function Loading() {
  return (
    <section className="static inset-0 w-full flex flex-auto justify-center items-center bg-background/50 backdrop-blur-md">
      <Loader2Icon className="text-foreground size-6 animate-spin" />
    </section>
  )
}
