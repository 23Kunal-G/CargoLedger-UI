'use client'

import { Package, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import { StatsCard } from '@/components/shared/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { colors } from '@/lib/colors'

/**
 * Customer Dashboard
 * Shows customer shipments and tracking information
 */
export function CustomerDashboard() {
  const stats = [
    {
      title: 'Total Shipments',
      value: '28',
      description: 'All time',
      icon: Package,
      variant: 'primary' as const,
    },
    {
      title: 'In Transit',
      value: '3',
      description: 'Currently',
      icon: MapPin,
      variant: 'warning' as const,
    },
    {
      title: 'Delivered',
      value: '23',
      description: 'Completed',
      icon: CheckCircle,
      variant: 'success' as const,
    },
    {
      title: 'Issues',
      value: '2',
      description: 'Need attention',
      icon: AlertCircle,
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
          My Shipments
        </h1>
        <p
          className="mt-2 text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          Track and manage your shipments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Your latest shipments</CardDescription>
            </div>
            <Button
              style={{
                backgroundColor: colors.primary.darkBlue,
                color: colors.neutral.white,
              }}
            >
              New Shipment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                id: 1,
                tracking: 'CL2024050020',
                to: 'Delhi, DL',
                status: 'in_transit',
                date: '15 May, 2024',
              },
              {
                id: 2,
                tracking: 'CL2024050019',
                to: 'Mumbai, MH',
                status: 'delivered',
                date: '14 May, 2024',
              },
              {
                id: 3,
                tracking: 'CL2024050018',
                to: 'Bangalore, KA',
                status: 'delivered',
                date: '13 May, 2024',
              },
              {
                id: 4,
                tracking: 'CL2024050017',
                to: 'Hyderabad, TG',
                status: 'delivered',
                date: '12 May, 2024',
              },
            ].map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center justify-between rounded-lg border p-4"
                style={{
                  borderColor: colors.neutral.mediumGray,
                }}
              >
                <div className="flex flex-1 items-center gap-4">
                  <div
                    className="rounded-lg p-2"
                    style={{
                      backgroundColor: colors.neutral.lightGray,
                    }}
                  >
                    <Package
                      size={20}
                      style={{
                        color: colors.primary.darkBlue,
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{shipment.tracking}</p>
                    <p
                      className="text-sm"
                      style={{
                        color: colors.neutral.secondaryText,
                      }}
                    >
                      To: {shipment.to}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className="text-xs"
                      style={{
                        color: colors.neutral.secondaryText,
                      }}
                    >
                      {shipment.date}
                    </p>
                  </div>
                  <StatusBadge status={shipment.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Track a Shipment</CardTitle>
            <CardDescription>Enter tracking number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter tracking number"
                className="flex-1 rounded-lg border-2 px-3 py-2"
                style={{
                  borderColor: colors.neutral.mediumGray,
                }}
              />
              <Button
                style={{
                  backgroundColor: colors.primary.darkBlue,
                  color: colors.neutral.white,
                }}
              >
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>Support resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              View FAQ
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Download Invoice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
