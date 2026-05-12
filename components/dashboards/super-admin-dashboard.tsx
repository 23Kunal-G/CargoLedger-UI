'use client'

import { BarChart3, Package, Users, MapPin, TrendingUp, Activity } from 'lucide-react'
import { StatsCard } from '@/components/shared/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/status-badge'
import { colors } from '@/lib/colors'

/**
 * Super Admin Dashboard
 * Displays system-wide metrics and management overview
 */
export function SuperAdminDashboard() {
  // Mock data - will be replaced with API calls in Phase 2
  const stats = [
    {
      title: 'Total Branches',
      value: '12',
      icon: MapPin,
      trend: { value: 8, isPositive: true },
      variant: 'primary' as const,
    },
    {
      title: 'Total Managers',
      value: '24',
      icon: Users,
      trend: { value: 12, isPositive: true },
      variant: 'primary' as const,
    },
    {
      title: 'Total Employees',
      value: '156',
      icon: Users,
      trend: { value: 5, isPositive: true },
      variant: 'success' as const,
    },
    {
      title: 'Total Shipments',
      value: '8,752',
      icon: Package,
      trend: { value: 23, isPositive: true },
      variant: 'primary' as const,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      description: 'New branch created: Delhi Hub',
      timestamp: '2 hours ago',
      status: 'success',
    },
    {
      id: 2,
      description: 'Shipment CL202405001 delivered',
      timestamp: '3 hours ago',
      status: 'success',
    },
    {
      id: 3,
      description: 'Payment received for CL202405002',
      timestamp: '5 hours ago',
      status: 'pending',
    },
    {
      id: 4,
      description: 'New employee added: Amit Kumar',
      timestamp: '1 day ago',
      status: 'success',
    },
  ]

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
            <div className="text-3xl font-bold text-foreground">1,258</div>
            <p
              className="mt-2 text-sm"
              style={{
                color: colors.neutral.secondaryText,
              }}
            >
              In transit across all branches
            </p>
            <div className="mt-4 space-y-3">
              {[
                { branch: 'Kolkata (HQ)', count: 320, status: 'pending' },
                { branch: 'Bangalore', count: 250, status: 'pending' },
                { branch: 'Mumbai', count: 310, status: 'pending' },
              ].map((item) => (
                <div key={item.branch} className="flex items-center justify-between">
                  <span className="text-sm">{item.branch}</span>
                  <StatusBadge status={item.status} />
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
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
              <p className="mt-1 text-2xl font-bold text-foreground">2,850</p>
              <p
                className="mt-1 text-xs"
                style={{
                  color: colors.status.success,
                }}
              >
                32.6% of total
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
              <p className="mt-1 text-2xl font-bold text-foreground">2,850</p>
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
