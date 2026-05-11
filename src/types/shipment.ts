import { ReactNode } from "react"

export interface TrackingEvent {
  id: string
  eventType: string
  branchName: string
  timestamp: string
  status: string
  description?: string
  icon?: ReactNode
}