'use client'

import { ShipmentStatus } from '@/lib/types'
import { colors } from '@/lib/colors'
import { Badge } from '@/components/ui/badge'

interface StatusBadgeProps {
  status: ShipmentStatus | string
  className?: string
  variant?: 'default' | 'outline'
}

/**
 * Reusable Status Badge Component
 * Displays shipment or payment status with semantic colors
 */
export function StatusBadge({ status, className = '', variant = 'default' }: StatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status?.toUpperCase()) {
      case ShipmentStatus.PENDING:
      case 'PENDING':
        return {
          bg: colors.status.pending,
          text: colors.neutral.darkGray,
          label: 'Pending',
        }
      case ShipmentStatus.BOOKED:
      case 'BOOKED':
        return {
          bg: colors.status.info,
          text: colors.neutral.white,
          label: 'Booked',
        }
      case ShipmentStatus.IN_TRANSIT:
      case 'IN_TRANSIT':
        return {
          bg: colors.status.info,
          text: colors.neutral.white,
          label: 'In Transit',
        }
      case ShipmentStatus.DELIVERED:
      case 'DELIVERED':
        return {
          bg: colors.status.success,
          text: colors.neutral.white,
          label: 'Delivered',
        }
      case ShipmentStatus.CANCELLED:
      case 'CANCELLED':
        return {
          bg: colors.status.cancelled,
          text: colors.neutral.white,
          label: 'Cancelled',
        }
      case ShipmentStatus.RETURNED:
      case 'RETURNED':
        return {
          bg: colors.status.warning,
          text: colors.neutral.white,
          label: 'Returned',
        }
      default:
        return {
          bg: colors.neutral.mediumGray,
          text: colors.neutral.darkGray,
          label: status || 'Unknown',
        }
    }
  }

  const style = getStatusStyle()

  if (variant === 'outline') {
    return (
      <Badge
        variant="outline"
        className={className}
        style={{
          borderColor: style.bg,
          color: style.bg,
        }}
      >
        {style.label}
      </Badge>
    )
  }

  return (
    <Badge
      className={className}
      style={{
        backgroundColor: style.bg,
        color: style.text,
      }}
    >
      {style.label}
    </Badge>
  )
}
