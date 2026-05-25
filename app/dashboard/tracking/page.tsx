'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrackingTimeline } from '@/components/shipment/tracking-timeline'
import { StatusBadge } from '@/components/shared/status-badge'
import { Shipment, TrackingEvent } from '@/lib/types'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiData } from '@/lib/api-response'

interface TrackedShipment extends Shipment {
  events?: TrackingEvent[]
  trackingEvents?: TrackingEvent[]
}

/**
 * Tracking Page
 * Track shipments by tracking number
 */
export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [shipment, setShipment] = useState<TrackedShipment | null>(null)
  const [events, setEvents] = useState<TrackingEvent[]>([])
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return

    setIsSearching(true)
    setError('')
    setShipment(null)
    setEvents([])

    const response = await apiClient.get<TrackedShipment>(
      API_ENDPOINTS.SHIPMENTS.TRACK(trackingNumber.trim()),
    )

    if (response.success) {
      const trackedShipment = unwrapApiData(response.data)
      setShipment(trackedShipment || null)
      setEvents(trackedShipment?.events || trackedShipment?.trackingEvents || [])
    } else {
      setError(response.error || 'Unable to track shipment')
    }

    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6 p-6 sm:p-8">
      <div>
        <h1
          className="text-3xl font-bold"
          style={{
            color: colors.neutral.darkGray,
          }}
        >
          Track Shipment
        </h1>
        <p
          className="mt-2 text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          Enter your tracking number to track your shipment
        </p>
        {error && (
          <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
            {error}
          </p>
        )}
      </div>

      <Card
        style={{
          borderColor: colors.primary.darkBlue,
          borderWidth: '2px',
        }}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border-2 text-base"
              style={{
                borderColor: colors.neutral.mediumGray,
              }}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              style={{
                backgroundColor: colors.primary.darkBlue,
                color: colors.neutral.white,
              }}
              className="whitespace-nowrap"
            >
              <Search size={20} className="mr-2" />
              {isSearching ? 'Searching...' : 'Track'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {shipment && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{shipment.trackingNumber}</CardTitle>
                  <CardDescription>Your shipment details</CardDescription>
                </div>
                <StatusBadge status={shipment.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: colors.neutral.secondaryText }}>
                    From
                  </p>
                  <p className="mt-2 font-semibold text-foreground">{shipment.fromBranchId}</p>
                  <p className="text-xs" style={{ color: colors.neutral.secondaryText }}>
                    {shipment.senderName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: colors.neutral.secondaryText }}>
                    To
                  </p>
                  <p className="mt-2 font-semibold text-foreground">{shipment.toBranchId}</p>
                  <p className="text-xs" style={{ color: colors.neutral.secondaryText }}>
                    {shipment.receiverName}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: colors.neutral.secondaryText }}>
                    Amount
                  </p>
                  <p className="mt-2 font-semibold text-foreground">Rs. {shipment.amount}</p>
                  <p className="text-xs" style={{ color: colors.status.success }}>
                    {shipment.paymentStatus}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase" style={{ color: colors.neutral.secondaryText }}>
                    Weight
                  </p>
                  <p className="mt-2 font-semibold text-foreground">{shipment.weight} kg</p>
                  <p className="text-xs" style={{ color: colors.neutral.secondaryText }}>
                    {shipment.itemDescription}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <TrackingTimeline events={events} shipmentStatus={shipment.status} />

          {shipment.isBlockchainVerified && (
            <Card
              style={{
                borderColor: colors.status.success,
                borderWidth: '2px',
              }}
            >
              <CardHeader>
                <CardTitle
                  style={{
                    color: colors.status.success,
                  }}
                >
                  Blockchain Verified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-semibold" style={{ color: colors.neutral.secondaryText }}>
                  Verification Hash
                </p>
                <p className="mt-1 break-all font-mono text-sm" style={{ color: colors.status.success }}>
                  {shipment.blockchainHash}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {!shipment && !isSearching && !error && (
        <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
          Search a backend tracking number to load live shipment data.
        </p>
      )}
    </div>
  )
}
