'use client'

import { Clock, MapPin, CheckCircle, AlertCircle, Package } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { colors } from '@/lib/colors'
import { TrackingEvent } from '@/lib/types'

interface TrackingTimelineProps {
  events: TrackingEvent[]
  shipmentStatus?: string
  isLoading?: boolean
}

/**
 * Reusable Tracking Timeline Component
 * Displays shipment tracking events in a timeline format
 */
export function TrackingTimeline({
  events,
  shipmentStatus = 'IN_TRANSIT',
  isLoading = false,
}: TrackingTimelineProps) {
  const getEventIcon = (eventType: string) => {
    switch (eventType?.toUpperCase()) {
      case 'BOOKED':
        return <Package size={20} className="text-blue-500" />
      case 'PICKED':
      case 'PICKED_UP':
        return <Package size={20} className="text-blue-500" />
      case 'IN_TRANSIT':
        return <Package size={20} style={{ color: colors.status.pending }} />
      case 'OUT_FOR_DELIVERY':
        return <MapPin size={20} style={{ color: colors.status.pending }} />
      case 'DELIVERED':
        return <CheckCircle size={20} style={{ color: colors.status.success }} />
      case 'FAILED':
      case 'CANCELLED':
        return <AlertCircle size={20} style={{ color: colors.status.cancelled }} />
      default:
        return <Clock size={20} style={{ color: colors.neutral.secondaryText }} />
    }
  }

  const getEventColor = (eventType: string) => {
    switch (eventType?.toUpperCase()) {
      case 'DELIVERED':
        return colors.status.success
      case 'FAILED':
      case 'CANCELLED':
        return colors.status.cancelled
      case 'IN_TRANSIT':
      case 'OUT_FOR_DELIVERY':
        return colors.status.pending
      default:
        return colors.primary.lightBlue
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading tracking...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Tracking History</CardTitle>
          <CardDescription>Track your shipment journey</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        {events.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <p
              className="text-sm"
              style={{
                color: colors.neutral.secondaryText,
              }}
            >
              No tracking events yet
            </p>
          </div>
        ) : (
          <div className="relative space-y-6 pt-4">
            {/* Timeline line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-1"
              style={{
                backgroundColor: colors.neutral.mediumGray,
              }}
            />

            {events.map((event, index) => {
              const eventColor = getEventColor(event.eventType)
              const isActive = index === 0

              return (
                <div key={event.id} className="relative pl-20">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-2 top-1 h-12 w-12 rounded-full border-4 flex items-center justify-center"
                    style={{
                      borderColor: isActive ? eventColor : colors.neutral.mediumGray,
                      backgroundColor: isActive ? eventColor + '20' : colors.neutral.lightGray,
                    }}
                  >
                    {getEventIcon(event.eventType)}
                  </div>

                  {/* Event content */}
                  <div
                    className="rounded-lg border-2 p-4"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                      backgroundColor: colors.neutral.white,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p
                          className="font-semibold capitalize"
                          style={{
                            color: eventColor,
                          }}
                        >
                          {event.eventType?.toLowerCase().replace('_', ' ')}
                        </p>
                        <p className="mt-1 text-sm text-foreground">{event.description}</p>
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      >
                        {new Date(event.timestamp).toLocaleDateString()} at{' '}
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    {/* Location info */}
                    {event.location && (
                      <div
                        className="mt-3 flex items-center gap-2 text-sm"
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      >
                        <MapPin size={16} />
                        <span>{event.location}</span>
                        {event.coordinates && (
                          <span>
                            ({event.coordinates.latitude.toFixed(2)}, {event.coordinates.longitude.toFixed(2)})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Branch info */}
                    {event.branchId && (
                      <div
                        className="mt-2 text-xs"
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      >
                        Branch: {event.branchId}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
