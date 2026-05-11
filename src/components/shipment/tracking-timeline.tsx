import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { TrackingEvent } from "@/types/shipment"
import { cn } from "@/lib/utils"

interface TrackingTimelineProps {
  events: TrackingEvent[]
  currentStatus: string
}

export function TrackingTimeline({ events, currentStatus }: TrackingTimelineProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6 pt-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cargo-primary to-cargo-success" />
          
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-8 flex items-start"
            >
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className={cn(
                  "h-8 w-8 rounded-full border-2 flex items-center justify-center text-xs font-medium",
                  event.status === currentStatus 
                    ? "bg-cargo-primary border-cargo-primary text-white shadow-lg" 
                    : "bg-background border-muted-foreground/40 text-muted-foreground"
                )}>
                  {event.icon || <MapPin className="h-4 w-4" />}
                </div>
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{event.eventType}</span>
                  <Badge variant="secondary" className="text-xs">
                    {event.branchName}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {event.timestamp}
                </p>
                {event.description && (
                  <p className="text-sm text-foreground">{event.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}