'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShipmentTable } from '@/components/shipment/shipment-table'
import { Shipment } from '@/lib/types'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiList } from '@/lib/api-response'

/**
 * Shipments Page
 * Displays and manages all shipments
 */
export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchShipments = async () => {
    setIsLoading(true)
    setError('')

    const response = await apiClient.get<Shipment[]>(API_ENDPOINTS.SHIPMENTS.LIST)

    if (response.success) {
      setShipments(unwrapApiList<Shipment>(response.data))
    } else {
      setError(response.error || 'Unable to load shipments')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchShipments()
  }, [])

  const handleViewShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment)
  }

  const handleEditShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment)
  }

  const handleDeleteShipment = async (shipmentId: string) => {
    const response = await apiClient.delete(API_ENDPOINTS.SHIPMENTS.DELETE(shipmentId))

    if (response.success) {
      setShipments((currentShipments) =>
        currentShipments.filter((shipment) => shipment.id !== shipmentId),
      )
    } else {
      setError(response.error || 'Unable to delete shipment')
    }
  }

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
            Shipments
          </h1>
          <p
            className="mt-2 text-sm"
            style={{
              color: colors.neutral.secondaryText,
            }}
          >
            Manage and track all shipments
          </p>
          {error && (
            <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
              {error}
            </p>
          )}
        </div>
        <Button
          style={{
            backgroundColor: colors.primary.darkBlue,
            color: colors.neutral.white,
          }}
        >
          <Plus size={20} className="mr-2" />
          New Shipment
        </Button>
      </div>

      {/* Shipment Table */}
      <ShipmentTable
        shipments={shipments}
        onView={handleViewShipment}
        onEdit={handleEditShipment}
        onDelete={handleDeleteShipment}
        isLoading={isLoading}
        showFilters={true}
      />
      {selectedShipment && (
        <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
          Selected shipment: {selectedShipment.trackingNumber}
        </p>
      )}
    </div>
  )
}
