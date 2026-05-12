'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrackingTimeline } from '@/components/shipment/tracking-timeline'
import { StatusBadge } from '@/components/shared/status-badge'
import { TrackingEvent } from '@/lib/types'
import { colors } from '@/lib/colors'

/**
 * Tracking Page
 * Track shipments by tracking number
 */
export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Mock tracking data
  const mockEvents: TrackingEvent[] = [
    {
      id: '1',
      shipmentId: 'ship1',
      eventType: 'DELIVERED',
      location: 'Customer Address, Delhi',
      branchId: 'delhi-hub',
      description: 'Package delivered to recipient',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      coordinates: { latitude: 28.6139, longitude: 77.209 },
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      shipmentId: 'ship1',
      eventType: 'OUT_FOR_DELIVERY',
      location: 'Delhi Distribution Center',
      branchId: 'delhi-hub',
      description: 'Package is out for delivery',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      coordinates: { latitude: 28.5244, longitude: 77.1855 },
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      shipmentId: 'ship1',
      eventType: 'IN_TRANSIT',
      location: 'In transit from Gurgaon Hub',
      branchId: 'gurgaon-hub',
      description: 'Package is in transit',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      coordinates: { latitude: 28.4595, longitude: 77.0266 },
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      shipmentId: 'ship1',
      eventType: 'PICKED_UP',
      location: 'Kolkata HQ',
      branchId: 'kolkata-hq',
      description: 'Package picked up from sender',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      coordinates: { latitude: 22.5726, longitude: 88.3639 },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      shipmentId: 'ship1',
      eventType: 'BOOKED',
      location: 'Kolkata HQ',
      branchId: 'kolkata-hq',
      description: 'Shipment booked',
      timestamp: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
      coordinates: { latitude: 22.5726, longitude: 88.3639 },
      createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const handleSearch = async () => {
    if (!trackingNumber.trim()) return

    setIsSearching(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSearching(false)
    setShowResults(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
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
      </div>

      {/* Search Card */}
      <Card
        style={{
          borderColor: colors.primary.darkBlue,
          borderWidth: '2px',
        }}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              placeholder="Enter tracking number (e.g., CL2024050015)"
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

      {/* Results */}
      {showResults && (
        <div className="space-y-6">
          {/* Shipment Summary */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{trackingNumber}</CardTitle>
                  <CardDescription>Your shipment details</CardDescription>
                </div>
                <StatusBadge status="DELIVERED" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <p
                    className="text-xs font-semibold uppercase"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    From
                  </p>
                  <p className="mt-2 font-semibold text-foreground">Kolkata</p>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Kolkata HQ
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    To
                  </p>
                  <p className="mt-2 font-semibold text-foreground">Delhi</p>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Delhi Hub
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Amount
                  </p>
                  <p className="mt-2 font-semibold text-foreground">₹5,000</p>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.status.success,
                    }}
                  >
                    Paid
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Weight
                  </p>
                  <p className="mt-2 font-semibold text-foreground">2.5 kg</p>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Electronics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <TrackingTimeline events={mockEvents} shipmentStatus="DELIVERED" />

          {/* Blockchain Verification */}
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
                ✓ Blockchain Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Verification Hash
                  </p>
                  <p
                    className="mt-1 break-all font-mono text-sm"
                    style={{
                      color: colors.status.success,
                    }}
                  >
                    0x1234567890abcdef1234567890abcdef1234567890abcdef
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-semibold"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Verified On
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sample Tracking Numbers */}
      {!showResults && (
        <Card
          style={{
            backgroundColor: colors.neutral.lightBg,
            borderColor: colors.neutral.mediumGray,
            borderWidth: '1px',
          }}
        >
          <CardHeader>
            <CardTitle>Try These Sample Tracking Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['CL2024050015', 'CL2024050014', 'CL2024050013'].map((trackNum) => (
                <button
                  key={trackNum}
                  onClick={() => {
                    setTrackingNumber(trackNum)
                  }}
                  className="block w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-muted"
                  style={{
                    color: colors.primary.darkBlue,
                  }}
                >
                  {trackNum}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
