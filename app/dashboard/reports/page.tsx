'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Calendar, Download } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiData } from '@/lib/api-response'

interface ReportStat {
  title: string
  value: string | number
  description?: string
  change?: string
  isPositive?: boolean
}

interface ShipmentTrend {
  date: string
  delivered?: number
  pending?: number
  cancelled?: number
}

interface RevenueTrend {
  month: string
  revenue?: number
  expenses?: number
}

interface StatusDistribution {
  name: string
  value: number
  fill?: string
}

interface ShipmentReport {
  stats?: ReportStat[]
  shipmentTrends?: ShipmentTrend[]
  statusDistribution?: StatusDistribution[]
}

interface PaymentReport {
  revenueTrends?: RevenueTrend[]
}

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStat[]>([])
  const [shipmentData, setShipmentData] = useState<ShipmentTrend[]>([])
  const [revenueData, setRevenueData] = useState<RevenueTrend[]>([])
  const [statusData, setStatusData] = useState<StatusDistribution[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true)
      setError('')

      const [shipmentResponse, paymentResponse] = await Promise.all([
        apiClient.get<ShipmentReport>(API_ENDPOINTS.REPORTS.SHIPMENT_ANALYTICS),
        apiClient.get<PaymentReport>(API_ENDPOINTS.REPORTS.PAYMENT_REPORT),
      ])

      if (shipmentResponse.success) {
        const shipmentReport = unwrapApiData(shipmentResponse.data)
        setStats(shipmentReport?.stats || [])
        setShipmentData(shipmentReport?.shipmentTrends || [])
        setStatusData(
          (shipmentReport?.statusDistribution || []).map((item, index) => ({
            ...item,
            fill:
              item.fill ||
              [
                colors.status.success,
                colors.status.pending,
                colors.status.cancelled,
                colors.status.info,
              ][index % 4],
          })),
        )
      } else {
        setError(shipmentResponse.error || 'Unable to load shipment reports')
      }

      if (paymentResponse.success) {
        const paymentReport = unwrapApiData(paymentResponse.data)
        setRevenueData(paymentReport?.revenueTrends || [])
      }

      setIsLoading(false)
    }

    fetchReports()
  }, [])

  const handleExportReport = async () => {
    setError('')
    const response = await apiClient.get(API_ENDPOINTS.REPORTS.EXPORT_REPORT('summary'))

    if (!response.success) {
      setError(response.error || 'Unable to export report')
    }
  }

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.neutral.darkGray }}>
            Reports & Analytics
          </h1>
          <p className="mt-2 text-sm" style={{ color: colors.neutral.secondaryText }}>
            Business performance and insights
          </p>
          {error && (
            <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
              {error}
            </p>
          )}
        </div>
        <Button
          onClick={handleExportReport}
          style={{
            backgroundColor: colors.primary.darkBlue,
            color: colors.neutral.white,
          }}
        >
          <Download size={20} className="mr-2" />
          Export Report
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="flex h-32 items-center justify-center">
            <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
              Loading reports...
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.length === 0 && (
              <Card className="sm:col-span-2 lg:col-span-4">
                <CardContent className="flex h-32 items-center justify-center">
                  <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                    No report stats available
                  </p>
                </CardContent>
              </Card>
            )}
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <p className="text-sm font-medium" style={{ color: colors.neutral.secondaryText }}>
                    {stat.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                  {stat.change && (
                    <span
                      className="mt-2 inline-block text-xs font-medium"
                      style={{
                        color: stat.isPositive
                          ? colors.status.success
                          : colors.status.cancelled,
                      }}
                    >
                      {stat.change}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shipment Trends</CardTitle>
                <CardDescription>Backend shipment analytics</CardDescription>
              </CardHeader>
              <CardContent>
                {shipmentData.length === 0 ? (
                  <EmptyChart />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={shipmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral.mediumGray} />
                      <XAxis dataKey="date" stroke={colors.neutral.secondaryText} />
                      <YAxis stroke={colors.neutral.secondaryText} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="delivered" fill={colors.status.success} />
                      <Bar dataKey="pending" fill={colors.status.pending} />
                      <Bar dataKey="cancelled" fill={colors.status.cancelled} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Backend payment report</CardDescription>
              </CardHeader>
              <CardContent>
                {revenueData.length === 0 ? (
                  <EmptyChart />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.neutral.mediumGray} />
                      <XAxis dataKey="month" stroke={colors.neutral.secondaryText} />
                      <YAxis stroke={colors.neutral.secondaryText} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke={colors.primary.darkBlue} />
                      <Line type="monotone" dataKey="expenses" stroke={colors.status.pending} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shipment Status Distribution</CardTitle>
              <CardDescription>Current status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {statusData.length === 0 ? (
                <EmptyChart />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {statusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create custom reports for your business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button variant="outline" className="justify-start">
                  <BarChart3 size={16} className="mr-2" />
                  Shipment Analytics
                </Button>
                <Button variant="outline" className="justify-start">
                  <BarChart3 size={16} className="mr-2" />
                  Branch Performance
                </Button>
                <Button variant="outline" className="justify-start">
                  <BarChart3 size={16} className="mr-2" />
                  Payment Report
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar size={16} className="mr-2" />
                  Custom Date Range
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
        No chart data available
      </p>
    </div>
  )
}
