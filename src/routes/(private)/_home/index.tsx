import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { SkeletonHomePage } from '../-components/skeleton-home-page'

export const Route = createFileRoute('/(private)/_home/')({
  component: HomePage,
})

function HomePage() {
  const router = Route.useNavigate()

  useEffect(() => {
    setTimeout(() => {
      router({
        to: '/app',
        replace: true,
      })
    }, 2000)
  }, [router])

  return <SkeletonHomePage />
}
