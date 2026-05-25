'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Package, Users, MapPin, Activity } from 'lucide-react'
import { StatsCard } from '@/components/shared/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/status-badge'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiData } from '@/lib/api-response'

interface SuperAdminDashboardData {
  totalBranches?: number
  totalManagers?: number
  totalEmployees?: number
  totalShipments?: number
  pendingDeliveries?: number
  verifiedShipments?: number
  blockchainHashStored?: number
  branchPendingDeliveries?: Array<{
    branch: string
    count: number
    status?: string
  }>
  recentActivities?: Array<{
    id: string | number
    description: string
    timestamp: string
    status: string
  }>
  trends?: {
    branches?: number
    managers?: number
    employees?: number
    shipments?: number
  }
}

/**
 * Super Admin Dashboard
 * Displays system-wide metrics and management overview
 */
export function SuperAdminDashboard() {
  const [dashboardData, setDashboardData] = useState<SuperAdminDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true)
      setError('')

      const response = await apiClient.get<SuperAdminDashboardData>(
        API_ENDPOINTS.DASHBOARD.SUPER_ADMIN,
      )

      if (response.success) {
        setDashboardData(unwrapApiData(response.data) || null)
      } else {
        setError(response.error || 'Unable to load dashboard data')
      }

      setIsLoading(false)
    }

    fetchDashboard()
  }, [])

  const stats = [
    {
      title: 'Total Branches',
      value: dashboardData?.totalBranches?.toLocaleString() || '0',
      icon: MapPin,
      trend: { value: dashboardData?.trends?.branches || 0, isPositive: true },
      variant: 'primary' as const,
    },
    {
      title: 'Total Managers',
      value: dashboardData?.totalManagers?.toLocaleString() || '0',
      icon: Users,
      trend: { value: dashboardData?.trends?.managers || 0, isPositive: true },
      variant: 'primary' as const,
    },
    {
      title: 'Total Employees',
      value: dashboardData?.totalEmployees?.toLocaleString() || '0',
      icon: Users,
      trend: { value: dashboardData?.trends?.employees || 0, isPositive: true },
      variant: 'success' as const,
    },
    {
      title: 'Total Shipments',
      value: dashboardData?.totalShipments?.toLocaleString() || '0',
      icon: Package,
      trend: { value: dashboardData?.trends?.shipments || 0, isPositive: true },
      variant: 'primary' as const,
    },
  ]

  const recentActivities = dashboardData?.recentActivities || []
  const branchPendingDeliveries = dashboardData?.branchPendingDeliveries || []

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center p-6">
        <p style={{ color: colors.neutral.secondaryText }}>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold"
          style={{
            color: colors.neutral.darkGray,
          }}
        >
          Super Admin Dashboard
        </h1>
        <p
          className="mt-2 text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          Welcome back! Here&apos;s what&apos;s happening with your logistics network.
        </p>
        {error && (
          <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
            {error}
          </p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pending Deliveries */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Pending Deliveries</CardTitle>
                <CardDescription>Shipments awaiting delivery</CardDescription>
              </div>
              <Package
                size={24}
                style={{
                  color: colors.status.pending,
                }}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {dashboardData?.pendingDeliveries?.toLocaleString() || '0'}
            </div>
            <p
              className="mt-2 text-sm"
              style={{
                color: colors.neutral.secondaryText,
              }}
            >
              In transit across all branches
            </p>
            <div className="mt-4 space-y-3">
              {branchPendingDeliveries.map((item) => (
                <div key={item.branch} className="flex items-center justify-between">
                  <span className="text-sm">{item.branch}</span>
                  <StatusBadge status={item.status || 'pending'} />
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
              {branchPendingDeliveries.length === 0 && (
                <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                  No branch delivery data available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events</CardDescription>
              </div>
              <Activity
                size={24}
                style={{
                  color: colors.status.info,
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.description}</p>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.neutral.tertiaryText,
                    }}
                  >
                    {activity.timestamp}
                  </p>
                </div>
                <StatusBadge status={activity.status} className="ml-2" />
              </div>
            ))}
            {recentActivities.length === 0 && (
              <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                No recent activity available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Section */}
      <Card
        style={{
          borderColor: colors.status.info,
          borderWidth: '2px',
        }}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3
              size={20}
              style={{
                color: colors.status.info,
              }}
            />
            <div>
              <CardTitle>Blockchain Verification</CardTitle>
              <CardDescription>Shipments verified on blockchain</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                Verified Shipments
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {dashboardData?.verifiedShipments?.toLocaleString() || '0'}
              </p>
              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.status.success,
                }}
              >
                System-wide verified count
              </p>
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                Blockchain Hash Stored
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {dashboardData?.blockchainHashStored?.toLocaleString() ||
                  dashboardData?.verifiedShipments?.toLocaleString() ||
                  '0'}
              </p>
              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.status.success,
                }}
              >
                All verified shipments
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
