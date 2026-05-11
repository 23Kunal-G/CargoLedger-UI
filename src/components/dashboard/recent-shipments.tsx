"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Icons } from "@/components/icons"

interface Shipment {
  id: string
  trackingNumber: string
  destination: string
  status: "in-transit" | "pending" | "delivered" | "delayed"
  date: string
}

const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: "1",
    trackingNumber: "TRK-2024-001",
    destination: "New York",
    status: "in-transit",
    date: "2024-01-15"
  },
  {
    id: "2",
    trackingNumber: "TRK-2024-002",
    destination: "Los Angeles",
    status: "delivered",
    date: "2024-01-14"
  },
  {
    id: "3",
    trackingNumber: "TRK-2024-003",
    destination: "Chicago",
    status: "pending",
    date: "2024-01-13"
  },
  {
    id: "4",
    trackingNumber: "TRK-2024-004",
    destination: "Houston",
    status: "in-transit",
    date: "2024-01-12"
  },
  {
    id: "5",
    trackingNumber: "TRK-2024-005",
    destination: "Miami",
    status: "delayed",
    date: "2024-01-11"
  }
]

const statusColors = {
  "in-transit": "bg-blue-100 text-blue-800",
  "pending": "bg-yellow-100 text-yellow-800",
  "delivered": "bg-green-100 text-green-800",
  "delayed": "bg-red-100 text-red-800"
}

export function RecentShipments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>Latest shipment activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_SHIPMENTS.map((shipment) => (
              <div
                key={shipment.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Icons.package className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{shipment.trackingNumber}</p>
                    <p className="text-xs text-muted-foreground">{shipment.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={statusColors[shipment.status]}>
                    {shipment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
