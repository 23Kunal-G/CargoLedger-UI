import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  className 
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card className={cn("h-full overflow-hidden hover:shadow-xl transition-all duration-300", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span className={cn(
              "font-medium",
              trend === "up" ? "text-emerald-600" : "text-destructive"
            )}>
              {trend === "up" ? "+" : ""}{change}%
            </span>
            <span>{trend === "up" ? "from last month" : "from last month"}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}