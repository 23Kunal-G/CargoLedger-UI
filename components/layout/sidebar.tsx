'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  MapPin,
} from 'lucide-react'
import { useRole } from '@/hooks/useRole'
import { Button } from '@/components/ui/button'
import { colors } from '@/lib/colors'
import { cn } from '@/lib/utils'
import { UserRole } from '@/lib/types'

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  roles: UserRole[]
  submenu?: MenuItem[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
    href: '/dashboard',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER, UserRole.EMPLOYEE, UserRole.CUSTOMER],
  },
  {
    icon: <Package size={20} />,
    label: 'Shipments',
    href: '/dashboard/shipments',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER, UserRole.EMPLOYEE, UserRole.CUSTOMER],
  },
  {
    icon: <MapPin size={20} />,
    label: 'Tracking',
    href: '/dashboard/tracking',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER, UserRole.EMPLOYEE, UserRole.CUSTOMER],
  },
  {
    icon: <Users size={20} />,
    label: 'Users',
    href: '/dashboard/users',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER],
  },
  {
    icon: <MapPin size={20} />,
    label: 'Branches',
    href: '/dashboard/branches',
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    icon: <DollarSign size={20} />,
    label: 'Payments',
    href: '/dashboard/payments',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER],
  },
  {
    icon: <BarChart3 size={20} />,
    label: 'Reports',
    href: '/dashboard/reports',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER],
  },
  {
    icon: <Settings size={20} />,
    label: 'Settings',
    href: '/dashboard/settings',
    roles: [UserRole.SUPER_ADMIN, UserRole.BRANCH_MANAGER, UserRole.EMPLOYEE, UserRole.CUSTOMER],
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

/**
 * Role-Based Sidebar Navigation Component
 * Dynamically shows menu items based on user role
 */
export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { hasRole, userRole } = useRole()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const visibleItems = MENU_ITEMS.filter((item) => item.roles.includes(userRole || UserRole.CUSTOMER))

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label],
    )
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const active = isActive(item.href)
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedItems.includes(item.label)

    return (
      <div key={item.label}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleSubmenu(item.label)}
            className={cn(
              'w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50',
            )}
            style={{
              paddingLeft: `${12 + level * 12}px`,
              backgroundColor: active ? colors.primary.lightBlue : 'transparent',
              color: active ? colors.neutral.white : colors.neutral.white,
            }}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.label}</span>
            </div>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50',
            )}
            style={{
              paddingLeft: `${12 + level * 12}px`,
              backgroundColor: active ? colors.primary.lightBlue : 'transparent',
              color: colors.neutral.white,
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        )}
        {hasSubmenu && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.submenu?.map((subitem) => renderMenuItem(subitem, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 border-r bg-sidebar pt-16 transition-transform md:relative md:z-auto md:translate-x-0',
        !isOpen && '-translate-x-full md:translate-x-0',
      )}
      style={{
        backgroundColor: colors.primary.darkBlue,
        borderColor: colors.primary.lighterBlue,
      }}
    >
      <nav className="space-y-2 overflow-y-auto p-4 pt-6">
        {visibleItems.map((item) => renderMenuItem(item))}
      </nav>
    </aside>
  )
}
