'use client'

import { UserRole } from '@/lib/types'
import { useAuth } from './useAuth'

/**
 * Hook for role-based access control
 * Provides helper functions to check user permissions
 */
export function useRole() {
  const { user } = useAuth()

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false
    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(user.role)
  }

  const isSuperAdmin = (): boolean => hasRole(UserRole.SUPER_ADMIN)
  const isBranchManager = (): boolean => hasRole(UserRole.BRANCH_MANAGER)
  const isEmployee = (): boolean => hasRole(UserRole.EMPLOYEE)
  const isCustomer = (): boolean => hasRole(UserRole.CUSTOMER)

  return {
    userRole: user?.role,
    hasRole,
    isSuperAdmin,
    isBranchManager,
    isEmployee,
    isCustomer,
    user,
  }
}
