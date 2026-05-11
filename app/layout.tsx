import type { Metadata } from "next"
import { Inter } from "next/font/google"
// @ts-ignore
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/layout/sidebar-provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CargoLedger - Logistics Management System",
  description: "Modern logistics and transport management system for multi-branch operations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <SidebarProvider>
            {children}
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}