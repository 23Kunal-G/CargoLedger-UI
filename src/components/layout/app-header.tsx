"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

export function AppHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex items-center gap-4 px-6 py-4">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">CargoLedger</h1>
      </div>
    </header>
  )
}
