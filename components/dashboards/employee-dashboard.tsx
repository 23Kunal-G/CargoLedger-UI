'use client'

import { Package, CheckCircle, Clock, FileText } from 'lucide-react'
import { StatsCard } from '@/components/shared/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/status-badge'
import { colors } from '@/lib/colors'

/**
 * Employee Dashboard
 * Shows assigned shipments and daily tasks
 */
export function EmployeeDashboard() {
  const stats = [
    {
      title: 'Assigned Shipments',
      value: '23',
      description: 'Today',
      icon: Package,
      variant: 'primary' as const,
    },
    {
      title: 'Completed',
      value: '18',
      description: 'Today',
      icon: CheckCircle,
      variant: 'success' as const,
    },
    {
      title: 'Pending',
      value: '5',
      description: 'In progress',
      icon: Clock,
      variant: 'warning' as const,
    },
    {
      title: 'Tasks',
      value: '12',
      description: 'Awaiting completion',
      icon: FileText,
      variant: 'primary' as const,
    },
  ]

  const tasks = [
    {
      id: 1,
      name: 'Bookings',
      count: 8,
      status: 'pending',
    },
    {
      id: 2,
      name: 'Goods Received',
      count: 12,
      status: 'pending',
    },
    {
      id: 3,
      name: 'Dispatch',
      count: 5,
      status: 'pending',
    },
    {
      id: 4,
      name: 'Delivery',
      count: 7,
      status: 'in_transit',
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
          Employee Dashboard
        </h1>
        <p
          className="mt-2 text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          Manage your daily tasks and shipments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Tasks</CardTitle>
            <CardDescription>Your assigned work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-lg border-2 p-4"
                  style={{
                    borderColor: colors.neutral.mediumGray,
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    {task.name}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{task.count}</p>
                  <div className="mt-3">
                    <StatusBadge status={task.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>Latest shipments assigned to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, shipment: 'CL2024050015', from: 'Kolkata', to: 'Delhi', status: 'in_transit' },
              { id: 2, shipment: 'CL2024050014', from: 'Bangalore', to: 'Mumbai', status: 'in_transit' },
              { id: 3, shipment: 'CL2024050013', from: 'Kolkata', to: 'Chennai', status: 'pending' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.shipment}</p>
                  <p
                    className="text-sm"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    {item.from} → {item.to}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
