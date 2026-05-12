'use client'

import { useState } from 'react'
import { Bell, LogOut, Settings, User, Menu, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { colors } from '@/lib/colors'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  onMenuToggle?: () => void
  showMenuButton?: boolean
}

/**
 * Main Header Component
 * Displayed at the top of dashboard with user menu and notifications
 */
export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getUserInitials = () => {
    if (!user) return '?'
    const firstInitial = user.firstName?.charAt(0) || ''
    const lastInitial = user.lastName?.charAt(0) || ''
    return (firstInitial + lastInitial).toUpperCase()
  }

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-surface shadow-sm"
      style={{
        borderColor: colors.neutral.mediumGray,
        backgroundColor: colors.neutral.white,
      }}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Menu button and logo */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div
              className="rounded-lg p-1"
              style={{
                backgroundColor: colors.primary.darkBlue,
              }}
            >
              <span
                className="text-sm font-bold"
                style={{
                  color: colors.neutral.white,
                }}
              >
                CL
              </span>
            </div>
            <span
              className="hidden font-semibold sm:inline"
              style={{
                color: colors.primary.darkBlue,
              }}
            >
              CargoLedger
            </span>
          </div>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            style={{
              color: colors.neutral.secondaryText,
            }}
          >
            <Bell size={20} />
            <span
              className="absolute top-1 right-1 h-2 w-2 rounded-full"
              style={{
                backgroundColor: colors.status.pending,
              }}
            />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full p-0"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.firstName} />
                  <AvatarFallback
                    style={{
                      backgroundColor: colors.primary.darkBlue,
                      color: colors.neutral.white,
                    }}
                  >
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: colors.neutral.secondaryText,
                  }}
                >
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex gap-2 cursor-pointer">
                  <User size={16} />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex gap-2 cursor-pointer">
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex gap-2 cursor-pointer"
                style={{
                  color: colors.status.cancelled,
                }}
              >
                <LogOut size={16} />
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
