'use client'

import { useState } from 'react'
import { ChevronDown, Eye, Edit2, Trash2 } from 'lucide-react'
import { Shipment, ShipmentStatus } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/shared/status-badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { colors } from '@/lib/colors'
import { cn } from '@/lib/utils'

interface ShipmentTableProps {
  shipments: Shipment[]
  onView?: (shipment: Shipment) => void
  onEdit?: (shipment: Shipment) => void
  onDelete?: (shipmentId: string) => void
  isLoading?: boolean
  showFilters?: boolean
}

/**
 * Reusable Shipment Table Component
 * Displays shipments in a responsive table format
 * Can be used across different dashboards
 */
export function ShipmentTable({
  shipments,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
  showFilters = true,
}: ShipmentTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('date')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.senderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiverName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const toggleRowExpansion = (shipmentId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(shipmentId)) {
      newExpanded.delete(shipmentId)
    } else {
      newExpanded.add(shipmentId)
    }
    setExpandedRows(newExpanded)
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading shipments...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle>Shipments</CardTitle>
            <CardDescription>{filteredShipments.length} total shipments</CardDescription>
          </div>
        </div>
      </CardHeader>

      {showFilters && (
        <div className="border-t border-border px-6 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              placeholder="Search by tracking number or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2"
              style={{
                borderColor: colors.neutral.mediumGray,
              }}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="border-2"
                style={{
                  borderColor: colors.neutral.mediumGray,
                }}
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value={ShipmentStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={ShipmentStatus.BOOKED}>Booked</SelectItem>
                <SelectItem value={ShipmentStatus.IN_TRANSIT}>In Transit</SelectItem>
                <SelectItem value={ShipmentStatus.DELIVERED}>Delivered</SelectItem>
                <SelectItem value={ShipmentStatus.CANCELLED}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className="border-2"
                style={{
                  borderColor: colors.neutral.mediumGray,
                }}
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (Newest)</SelectItem>
                <SelectItem value="tracking">Tracking Number</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <CardContent className="overflow-x-auto pt-0">
        {filteredShipments.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <div>
              <p
                className="text-sm"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                No shipments found
              </p>
            </div>
          </div>
        ) : (
          <div className="min-w-full">
            {filteredShipments.map((shipment) => (
              <div
                key={shipment.id}
                className="border-t border-border"
                style={{
                  borderColor: colors.neutral.mediumGray,
                }}
              >
                {/* Main Row */}
                <div
                  className="flex items-center justify-between py-4 px-2"
                  style={{
                    backgroundColor: colors.neutral.white,
                  }}
                >
                  <div className="flex flex-1 items-center gap-4">
                    <button
                      onClick={() => toggleRowExpansion(shipment.id)}
                      className="rounded hover:bg-muted"
                    >
                      <ChevronDown
                        size={20}
                        className={cn(
                          'transition-transform',
                          expandedRows.has(shipment.id) && 'rotate-180',
                        )}
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      />
                    </button>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground">{shipment.trackingNumber}</p>
                      <p
                        className="text-xs"
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      >
                        {shipment.senderName} → {shipment.receiverName}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-3 sm:flex">
                    <div className="text-right">
                      <p
                        className="text-xs"
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      >
                        Amount
                      </p>
                      <p className="font-semibold text-foreground">₹{shipment.amount}</p>
                    </div>
                    <StatusBadge status={shipment.status} />
                  </div>

                  {/* Action Buttons */}
                  <div className="ml-4 flex gap-2">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(shipment)}
                        title="View details"
                      >
                        <Eye size={16} />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(shipment)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(shipment.id)}
                        title="Delete"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRows.has(shipment.id) && (
                  <div
                    className="border-t px-4 py-4"
                    style={{
                      backgroundColor: colors.neutral.lightBg,
                      borderColor: colors.neutral.mediumGray,
                    }}
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: colors.neutral.secondaryText,
                          }}
                        >
                          From Branch
                        </p>
                        <p className="mt-1 text-sm text-foreground">{shipment.fromBranchId}</p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: colors.neutral.secondaryText,
                          }}
                        >
                          To Branch
                        </p>
                        <p className="mt-1 text-sm text-foreground">{shipment.toBranchId}</p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: colors.neutral.secondaryText,
                          }}
                        >
                          Weight
                        </p>
                        <p className="mt-1 text-sm text-foreground">{shipment.weight} kg</p>
                      </div>
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: colors.neutral.secondaryText,
                          }}
                        >
                          Est. Delivery
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                          {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {shipment.isBlockchainVerified && (
                      <div
                        className="mt-4 rounded-lg p-3"
                        style={{
                          backgroundColor: colors.status.success + '20',
                        }}
                      >
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: colors.status.success,
                          }}
                        >
                          ✓ Verified on Blockchain
                        </p>
                        <p
                          className="mt-1 text-xs"
                          style={{
                            color: colors.status.success,
                          }}
                        >
                          Hash: {shipment.blockchainHash?.slice(0, 20)}...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
