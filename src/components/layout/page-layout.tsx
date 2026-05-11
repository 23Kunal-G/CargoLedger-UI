"use client"

import { usePathname } from "next/navigation"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { useUserStore } from "@/store/user-store"
import { useEffect } from "react"

interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  const pathname = usePathname()
  const { user, fetchUserProfile } = useUserStore()

  useEffect(() => {
    if (!user) {
      fetchUserProfile()
    }
  }, [user, fetchUserProfile])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1 flex-col">
        <SidebarInset>
          <main className="flex-1 p-6 lg:p-8 lg:pl-72">
            <div className="flex flex-col gap-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </div>
  )
}