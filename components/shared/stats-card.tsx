'use client'

import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { colors } from '@/lib/colors'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  variant?: 'default' | 'primary' | 'success' | 'warning'
}

/**
 * Reusable Statistics Card Component
 * Used across all dashboards for displaying key metrics
 */
export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = '',
  variant = 'default',
}: StatsCardProps) {
  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return {
          icon: colors.primary.darkBlue,
          bg: '#E0EBF9',
        }
      case 'success':
        return {
          icon: colors.status.success,
          bg: '#E6FFED',
        }
      case 'warning':
        return {
          icon: colors.status.warning,
          bg: '#FFF3E6',
        }
      default:
        return {
          icon: colors.primary.lightBlue,
          bg: '#F0F9FF',
        }
    }
  }

  const variantColors = getVariantColors()

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        {Icon && (
          <div
            className="rounded-lg p-2"
            style={{
              backgroundColor: variantColors.bg,
            }}
          >
            <Icon
              size={20}
              style={{
                color: variantColors.icon,
              }}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>}
        {trend && (
          <div className="mt-2 flex items-center gap-1 text-xs font-medium">
            <span
              style={{
                color: trend.isPositive ? colors.status.success : colors.status.cancelled,
              }}
            >
              {trend.isPositive ? '+' : '-'}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
