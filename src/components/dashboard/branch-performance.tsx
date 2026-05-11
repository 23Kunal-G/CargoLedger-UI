"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Icons } from "@/components/icons"

interface Branch {
  id: string
  name: string
  shipments: number
  performance: number
}

const MOCK_BRANCHES: Branch[] = [
  {
    id: "1",
    name: "New York HQ",
    shipments: 2340,
    performance: 98
  },
  {
    id: "2",
    name: "Los Angeles",
    shipments: 1890,
    performance: 96
  },
  {
    id: "3",
    name: "Chicago",
    shipments: 1650,
    performance: 94
  },
  {
    id: "4",
    name: "Houston",
    shipments: 1420,
    performance: 92
  },
  {
    id: "5",
    name: "Miami",
    shipments: 980,
    performance: 89
  }
]

export function BranchPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Branch Performance</CardTitle>
          <CardDescription>Performance metrics by branch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {MOCK_BRANCHES.map((branch) => (
              <div key={branch.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icons.branch className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">{branch.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{branch.performance}%</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${branch.performance}%` }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{branch.shipments} shipments</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
