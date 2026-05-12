'use client'

import { Package, Users, DollarSign, TrendingUp } from 'lucide-react'
import { StatsCard } from '@/components/shared/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { colors } from '@/lib/colors'

/**
 * Branch Manager Dashboard
 * Shows branch-specific metrics and operations
 */
export function BranchManagerDashboard() {
  const stats = [
    {
      title: 'Total Employees',
      value: '18',
      description: 'Active team members',
      icon: Users,
      variant: 'primary' as const,
    },
    {
      title: 'Pending Deliveries',
      value: '54',
      description: 'Awaiting dispatch',
      icon: Package,
      trend: { value: 8, isPositive: false },
      variant: 'warning' as const,
    },
    {
      title: 'Goods Received',
      value: '42',
      description: 'This month',
      icon: TrendingUp,
      variant: 'success' as const,
    },
    {
      title: 'Revenue',
      value: '₹2.5L',
      description: 'This month',
      icon: DollarSign,
      trend: { value: 15, isPositive: true },
      variant: 'primary' as const,
    },
  ]

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <div>
        <h1
          className="text-3xl font-bold"
          style={{
            color: colors.neutral.darkGray,
          }}
        >
          Branch Manager Dashboard
        </h1>
        <p
          className="mt-2 text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          Manage your branch operations and employee team
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              className="w-full rounded-lg px-4 py-2 text-left font-medium transition-colors hover:bg-muted"
              style={{
                backgroundColor: colors.neutral.lightGray,
                color: colors.primary.darkBlue,
              }}
            >
              Create New Shipment
            </button>
            <button
              className="w-full rounded-lg px-4 py-2 text-left font-medium transition-colors hover:bg-muted"
              style={{
                backgroundColor: colors.neutral.lightGray,
                color: colors.primary.darkBlue,
              }}
            >
              View Employee Tasks
            </button>
            <button
              className="w-full rounded-lg px-4 py-2 text-left font-medium transition-colors hover:bg-muted"
              style={{
                backgroundColor: colors.neutral.lightGray,
                color: colors.primary.darkBlue,
              }}
            >
              Generate Reports
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
            <CardDescription>This month&apos;s metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Rate</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>On-Time Delivery</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '87%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
