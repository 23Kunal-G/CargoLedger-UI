"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar"
import { Logo , Icons  } from "@/components/icons"
import { useUserStore } from "@/store/user-store"
import { UserRole } from "@/types/user"
import { cn } from "@/lib/utils"

const menuItems: Record<UserRole | "customer", { icon: typeof Icons.dashboard; title: string; href: string }[]> = {
  "super-admin": [
    { icon: Icons.dashboard, title: "Dashboard", href: "/super-admin/dashboard" },
    { icon: Icons.branch, title: "Branches", href: "/super-admin/branches" },
    { icon: Icons.users, title: "Managers", href: "/super-admin/managers" },
    { icon: Icons.package, title: "All Shipments", href: "/super-admin/shipments" },
    { icon: Icons.blockchain, title: "Blockchain", href: "/super-admin/blockchain" },
    { icon: Icons.chart, title: "Reports", href: "/super-admin/reports" },
  ],
  "branch-manager": [
    { icon: Icons.dashboard, title: "Dashboard", href: "/branch-manager/dashboard" },
    { icon: Icons.users, title: "Employees", href: "/branch-manager/employees" },
    { icon: Icons.package, title: "Shipments", href: "/branch-manager/shipments" },
    { icon: Icons.truck, title: "Dispatches", href: "/branch-manager/dispatches" },
    { icon: Icons.reports, title: "Reports", href: "/branch-manager/reports" },
  ],
  employee: [
    { icon: Icons.dashboard, title: "Dashboard", href: "/employee/dashboard" },
    { icon: Icons.plus, title: "New Booking", href: "/employee/bookings" },
    { icon: Icons.inbox, title: "Received", href: "/employee/received" },
    { icon: Icons.truck, title: "Dispatches", href: "/employee/dispatches" },
    { icon: Icons.package, title: "Deliveries", href: "/employee/deliveries" },
  ],
  customer: [
    { icon: Icons.dashboard, title: "My Shipments", href: "/customer/shipments" },
    { icon: Icons.truck, title: "Track Shipment", href: "/customer/track" },
    { icon: Icons.clock, title: "History", href: "/customer/history" },
  ]
}

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUserStore()
  const items = menuItems[user?.role as UserRole] || []

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 mb-8 p-2">
          <Logo className="h-8 w-8" />
          <span className="font-bold text-xl bg-gradient-to-r from-cargo-primary to-cargo-success bg-clip-text text-transparent">
            CargoLedger
          </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item: any) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  className={cn(
                    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || ''}
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs">{user?.role}</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}