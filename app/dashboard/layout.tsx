import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Dashboard - CargoLedger',
  description: 'CargoLedger dashboard for managing shipments and logistics',
}

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
