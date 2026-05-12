'use client'

import { useRole } from '@/hooks/useRole'
import { UserRole } from '@/lib/types'
import dynamic from 'next/dynamic'

// Dynamic imports for role-specific dashboards
const SuperAdminDashboard = dynamic(() =>
  import('@/components/dashboards/super-admin-dashboard').then((mod) => ({
    default: mod.SuperAdminDashboard,
  })),
)
const BranchManagerDashboard = dynamic(() =>
  import('@/components/dashboards/branch-manager-dashboard').then((mod) => ({
    default: mod.BranchManagerDashboard,
  })),
)
const EmployeeDashboard = dynamic(() =>
  import('@/components/dashboards/employee-dashboard').then((mod) => ({
    default: mod.EmployeeDashboard,
  })),
)
const CustomerDashboard = dynamic(() =>
  import('@/components/dashboards/customer-dashboard').then((mod) => ({
    default: mod.CustomerDashboard,
  })),
)

/**
 * Main Dashboard Page
 * Routes to role-specific dashboard based on user role
 */
export default function DashboardPage() {
  const { userRole } = useRole()

  switch (userRole) {
    case UserRole.SUPER_ADMIN:
      return <SuperAdminDashboard />
    case UserRole.BRANCH_MANAGER:
      return <BranchManagerDashboard />
    case UserRole.EMPLOYEE:
      return <EmployeeDashboard />
    case UserRole.CUSTOMER:
      return <CustomerDashboard />
    default:
      return (
        <div className="flex h-96 items-center justify-center">
          <p>Loading dashboard...</p>
        </div>
      )
  }
}
