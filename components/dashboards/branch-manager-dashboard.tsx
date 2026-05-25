'use client'

import { useEffect, useState } from 'react'
import {
  DollarSign,
  MailIcon,
  MapPin,
  Package,
  PhoneIcon,
  TrendingUp,
  Users,
} from 'lucide-react'
import { StatsCard } from '@/components/shared/stats-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiData } from '@/lib/api-response'
import { Branch } from '@/lib/types'
import { useAuth } from '@/hooks/useAuth'

/**
 * Branch Manager Dashboard
 * Shows branch-specific metrics and operations
 */
export function BranchManagerDashboard() {
  const { loading, user } = useAuth()
  const [branch, setBranch] = useState<Branch | null>(null)
  const [isLoadingBranch, setIsLoadingBranch] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBranchDetails = async () => {
      if (loading) return

      setIsLoadingBranch(true)
      setError('')

      const endpoint = user?.branchId
        ? API_ENDPOINTS.BRANCHES.GET(user.branchId)
        : API_ENDPOINTS.BRANCHES.MY_BRANCH
      const response = await apiClient.get<Branch>(endpoint)

      if (response.success) {
        setBranch(unwrapApiData(response.data) || null)
      } else {
        setError(response.error || 'Unable to load branch details')
      }

      setIsLoadingBranch(false)
    }

    fetchBranchDetails()
  }, [loading, user?.branchId])

  const stats = [
    {
      title: 'Total Employees',
      value: branch?.employeeCount?.toLocaleString() || '0',
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
        {error && (
          <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>{branch?.name || 'Branch Details'}</CardTitle>
              <CardDescription>
                {isLoadingBranch
                  ? 'Loading assigned branch...'
                  : branch?.location || 'Assigned branch information'}
              </CardDescription>
            </div>
            <MapPin size={24} style={{ color: colors.primary.darkBlue }} />
          </div>
        </CardHeader>
        <CardContent>
          {branch ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold" style={{ color: colors.neutral.secondaryText }}>
                  ADDRESS
                </p>
                <p className="mt-1 text-sm text-foreground">{branch.address}</p>
                <p className="text-xs" style={{ color: colors.neutral.secondaryText }}>
                  {branch.city}, {branch.state} {branch.zipCode}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon size={16} style={{ color: colors.primary.darkBlue }} />
                <div>
                  <p className="text-xs" style={{ color: colors.neutral.secondaryText }}>
                    Phone
                  </p>
                  <p className="text-sm text-foreground">{branch.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon size={16} style={{ color: colors.primary.darkBlue }} />
                <div>
                  <p className="text-xs" style={{ color: colors.neutral.secondaryText }}>
                    Email
                  </p>
                  <p className="text-sm text-foreground">{branch.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
              {isLoadingBranch ? 'Loading branch details...' : 'No branch details available.'}
            </p>
          )}
        </CardContent>
      </Card>

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
