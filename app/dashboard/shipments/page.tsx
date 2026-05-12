'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShipmentTable } from '@/components/shipment/shipment-table'
import { Shipment, ShipmentStatus } from '@/lib/types'
import { colors } from '@/lib/colors'

/**
 * Shipments Page
 * Displays and manages all shipments
 */
export default function ShipmentsPage() {
  // Mock data - will be replaced with API calls
  const mockShipments: Shipment[] = [
    {
      id: '1',
      trackingNumber: 'CL2024050015',
      status: ShipmentStatus.IN_TRANSIT,
      customerId: 'cust1',
      fromBranchId: 'kolkata-hq',
      toBranchId: 'delhi-hub',
      senderName: 'Amit Kumar',
      senderPhone: '9876543210',
      senderAddress: '123 Main St, Kolkata',
      receiverName: 'Rajesh Singh',
      receiverPhone: '9123456789',
      receiverAddress: '456 Park Ave, Delhi',
      itemDescription: 'Electronics - Laptop',
      weight: 2.5,
      amount: 5000,
      paymentStatus: 'COMPLETED',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      isBlockchainVerified: true,
      blockchainHash: '0x1234567890abcdef1234567890abcdef',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      trackingNumber: 'CL2024050014',
      status: ShipmentStatus.DELIVERED,
      customerId: 'cust2',
      fromBranchId: 'bangalore-hub',
      toBranchId: 'mumbai-hub',
      senderName: 'Priya Sharma',
      senderPhone: '9876543211',
      senderAddress: '789 Tech Park, Bangalore',
      receiverName: 'Vikram Patel',
      receiverPhone: '9123456790',
      receiverAddress: '321 Business St, Mumbai',
      itemDescription: 'Documents - Important Papers',
      weight: 0.5,
      amount: 2000,
      paymentStatus: 'COMPLETED',
      estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isBlockchainVerified: true,
      blockchainHash: '0xabcdef1234567890abcdef1234567890',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      trackingNumber: 'CL2024050013',
      status: ShipmentStatus.PENDING,
      customerId: 'cust3',
      fromBranchId: 'chennai-hub',
      toBranchId: 'hyderabad-hub',
      senderName: 'Sunil Reddy',
      senderPhone: '9876543212',
      senderAddress: '555 Industrial Area, Chennai',
      receiverName: 'Anjali Gupta',
      receiverPhone: '9123456791',
      receiverAddress: '789 Tech Street, Hyderabad',
      itemDescription: 'Textiles - Fabric Rolls',
      weight: 15.0,
      amount: 8500,
      paymentStatus: 'PENDING',
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      isBlockchainVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)

  const handleViewShipment = (shipment: Shipment) => {
    setSelectedShipment(shipment)
    console.log('View shipment:', shipment)
  }

  const handleEditShipment = (shipment: Shipment) => {
    console.log('Edit shipment:', shipment)
  }

  const handleDeleteShipment = (shipmentId: string) => {
    console.log('Delete shipment:', shipmentId)
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
        shipments={mockShipments}
        onView={handleViewShipment}
        onEdit={handleEditShipment}
        onDelete={handleDeleteShipment}
        showFilters={true}
      />
    </div>
  )
}
