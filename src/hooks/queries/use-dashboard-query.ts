import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '@/services/dashboard/dashboard'

export const dashboardQueryKey = ['dashboard'] as const

export function useDashboardQuery(
  workspaceId: string,
  month: string,
  year: string
) {
  return useQuery({
    queryKey: [...dashboardQueryKey, workspaceId, month, year],
    queryFn: () => DashboardService.GetDashboard(workspaceId, month, year),
    enabled: !!workspaceId,
  })
}
