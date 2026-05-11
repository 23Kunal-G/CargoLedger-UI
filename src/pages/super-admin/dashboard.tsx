import { Metadata } from "next"
import PageLayout from "@/components/layout/page-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ChartContainer } from "@/components/dashboard/chart-container"
import { RecentShipments } from "@/components/dashboard/recent-shipments"
import { BranchPerformance } from "@/components/dashboard/branch-performance"
import { Icons } from "@/components/icons"

export const metadata: Metadata = {
  title: "Super Admin Dashboard | CargoLedger"
}

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Branches",
      value: "24",
      change: 12,
      trend: "up" as const,
      icon: <Icons.branch className="h-5 w-5" />
    },
    {
      title: "Total Shipments",
      value: "12,450",
      change: 8,
      trend: "up" as const,
      icon: <Icons.package className="h-5 w-5" />
    },
    {
      title: "Pending Deliveries",
      value: "1,234",
      change: -5,
      trend: "down" as const,
      icon: <Icons.clock className="h-5 w-5" />
    },
    {
      title: "Blockchain Records",
      value: "45,678",
      change: 23,
      trend: "up" as const,
      icon: <Icons.blockchain className="h-5 w-5" />
    }
  ]

  return (
    <PageLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor all branches and system operations across West Bengal
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-cargo-primary text-primary-foreground rounded-lg font-medium hover:bg-cargo-primary/90 transition-all">
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartContainer title="Shipments Overview" className="col-span-1">
            <div className="h-72 w-full" />
          </ChartContainer>
          <ChartContainer title="Branch Performance" className="col-span-1">
            <div className="h-72 w-full" />
          </ChartContainer>
        </div>

        {/* Recent Activity & Branch Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <RecentShipments />
          <BranchPerformance />
        </div>
      </div>
    </PageLayout>
  )
}