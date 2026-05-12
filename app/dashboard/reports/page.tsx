'use client'

import { BarChart3, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { colors } from '@/lib/colors'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

/**
 * Reports Page
 * Analytics and reports dashboard
 */
export default function ReportsPage() {
  const shipmentData = [
    { date: 'Mon', delivered: 24, pending: 14, cancelled: 4 },
    { date: 'Tue', delivered: 32, pending: 10, cancelled: 2 },
    { date: 'Wed', delivered: 28, pending: 18, cancelled: 3 },
    { date: 'Thu', delivered: 35, pending: 12, cancelled: 1 },
    { date: 'Fri', delivered: 42, pending: 8, cancelled: 2 },
    { date: 'Sat', delivered: 38, pending: 15, cancelled: 4 },
    { date: 'Sun', delivered: 22, pending: 10, cancelled: 2 },
  ]

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 35000 },
    { month: 'Mar', revenue: 58000, expenses: 38000 },
    { month: 'Apr', revenue: 63000, expenses: 40000 },
    { month: 'May', revenue: 71000, expenses: 42000 },
  ]

  const statusData = [
    { name: 'Delivered', value: 65, fill: colors.status.success },
    { name: 'In Transit', value: 20, fill: colors.status.pending },
    { name: 'Cancelled', value: 8, fill: colors.status.cancelled },
    { name: 'Pending', value: 7, fill: colors.status.info },
  ]

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹71,00,000',
      description: 'This month',
      change: '+12.5% from last month',
      isPositive: true,
    },
    {
      title: 'Total Shipments',
      value: '8,752',
      description: 'Handled',
      change: '+5.2% from last month',
      isPositive: true,
    },
    {
      title: 'Avg Delivery Time',
      value: '2.3 days',
      description: 'Average',
      change: '-8% from last month',
      isPositive: true,
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      description: 'Rating',
      change: '+0.3 from last month',
      isPositive: true,
    },
  ]

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: colors.neutral.darkGray,
            }}
          >
            Reports & Analytics
          </h1>
          <p
            className="mt-2 text-sm"
            style={{
              color: colors.neutral.secondaryText,
            }}
          >
            Business performance and insights
          </p>
        </div>
        <Button
          style={{
            backgroundColor: colors.primary.darkBlue,
            color: colors.neutral.white,
          }}
        >
          <Download size={20} className="mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                {stat.title}
              </p>
              <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="text-xs font-medium"
                  style={{
                    color: stat.isPositive ? colors.status.success : colors.status.cancelled,
                  }}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Shipment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Shipment Trends</CardTitle>
            <CardDescription>Weekly breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shipmentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.neutral.mediumGray}
                />
                <XAxis dataKey="date" stroke={colors.neutral.secondaryText} />
                <YAxis stroke={colors.neutral.secondaryText} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors.neutral.white,
                    border: `1px solid ${colors.neutral.mediumGray}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="delivered" fill={colors.status.success} />
                <Bar dataKey="pending" fill={colors.status.pending} />
                <Bar dataKey="cancelled" fill={colors.status.cancelled} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={colors.neutral.mediumGray}
                />
                <XAxis dataKey="month" stroke={colors.neutral.secondaryText} />
                <YAxis stroke={colors.neutral.secondaryText} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: colors.neutral.white,
                    border: `1px solid ${colors.neutral.mediumGray}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={colors.primary.darkBlue}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke={colors.status.pending}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Shipment Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Shipment Status Distribution</CardTitle>
          <CardDescription>Current status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.neutral.white,
                  border: `1px solid ${colors.neutral.mediumGray}`,
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Report Options */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Create custom reports for your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
              variant="outline"
              className="justify-start"
              style={{
                borderColor: colors.neutral.mediumGray,
              }}
            >
              <BarChart3 size={16} className="mr-2" />
              Shipment Analytics
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              style={{
                borderColor: colors.neutral.mediumGray,
              }}
            >
              <BarChart3 size={16} className="mr-2" />
              Branch Performance
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              style={{
                borderColor: colors.neutral.mediumGray,
              }}
            >
              <BarChart3 size={16} className="mr-2" />
              Payment Report
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              style={{
                borderColor: colors.neutral.mediumGray,
              }}
            >
              <Calendar size={16} className="mr-2" />
              Custom Date Range
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
