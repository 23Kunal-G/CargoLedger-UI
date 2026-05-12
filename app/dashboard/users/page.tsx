'use client'

import { Plus, Eye, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, UserRole } from '@/lib/types'
import { colors } from '@/lib/colors'
import { useRole } from '@/hooks/useRole'
import { Badge } from '@/components/ui/badge'

/**
 * Users Management Page
 * Manage system users and permissions
 */
export default function UsersPage() {
  const { isSuperAdmin } = useRole()

  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@cargo.com',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.SUPER_ADMIN,
      phone: '9876543210',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'manager@cargo.com',
      firstName: 'Rajesh',
      lastName: 'Kumar',
      role: UserRole.BRANCH_MANAGER,
      branchId: 'kolkata-hq',
      phone: '9876543211',
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      email: 'emp@cargo.com',
      firstName: 'Amit',
      lastName: 'Singh',
      role: UserRole.EMPLOYEE,
      branchId: 'kolkata-hq',
      phone: '9876543212',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      email: 'customer@cargo.com',
      firstName: 'Priya',
      lastName: 'Sharma',
      role: UserRole.CUSTOMER,
      phone: '9876543213',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return { bg: colors.primary.darkBlue, text: colors.neutral.white }
      case UserRole.BRANCH_MANAGER:
        return { bg: colors.status.info, text: colors.neutral.white }
      case UserRole.EMPLOYEE:
        return { bg: colors.status.pending, text: colors.neutral.darkGray }
      case UserRole.CUSTOMER:
        return { bg: colors.status.success, text: colors.neutral.white }
      default:
        return { bg: colors.neutral.mediumGray, text: colors.neutral.darkGray }
    }
  }

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: colors.neutral.darkGray,
            }}
          >
            Users
          </h1>
          <p
            className="mt-2 text-sm"
            style={{
              color: colors.neutral.secondaryText,
            }}
          >
            Manage system users and permissions
          </p>
        </div>
        {isSuperAdmin() && (
          <Button
            style={{
              backgroundColor: colors.primary.darkBlue,
              color: colors.neutral.white,
            }}
          >
            <Plus size={20} className="mr-2" />
            New User
          </Button>
        )}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>{mockUsers.length} total users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    borderColor: colors.neutral.mediumGray,
                    borderBottomWidth: '2px',
                  }}
                >
                  <th
                    className="px-4 py-3 text-left text-sm font-semibold"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Name
                  </th>
                  <th
                    className="hidden px-4 py-3 text-left text-sm font-semibold sm:table-cell"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Email
                  </th>
                  <th
                    className="hidden px-4 py-3 text-left text-sm font-semibold md:table-cell"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Role
                  </th>
                  <th
                    className="hidden px-4 py-3 text-left text-sm font-semibold lg:table-cell"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Joined
                  </th>
                  <th
                    className="px-4 py-3 text-center text-sm font-semibold"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => {
                  const roleStyle = getRoleBadgeVariant(user.role)
                  return (
                    <tr
                      key={user.id}
                      style={{
                        borderColor: colors.neutral.mediumGray,
                        borderBottomWidth: '1px',
                      }}
                    >
                      <td className="px-4 py-4">
                        <div>
                          <p className="font-medium text-foreground">
                            {user.firstName} {user.lastName}
                          </p>
                          <p
                            className="text-xs sm:hidden"
                            style={{
                              color: colors.neutral.secondaryText,
                            }}
                          >
                            {user.email}
                          </p>
                        </div>
                      </td>
                      <td
                        className="hidden px-4 py-4 text-sm sm:table-cell"
                        style={{
                          color: colors.neutral.darkGray,
                        }}
                      >
                        {user.email}
                      </td>
                      <td className="hidden px-4 py-4 md:table-cell">
                        <Badge
                          style={{
                            backgroundColor: roleStyle.bg,
                            color: roleStyle.text,
                          }}
                        >
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td
                        className="hidden px-4 py-4 text-sm lg:table-cell"
                        style={{
                          color: colors.neutral.secondaryText,
                        }}
                      >
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye size={16} />
                          </Button>
                          {isSuperAdmin() && (
                            <>
                              <Button variant="ghost" size="icon">
                                <Edit2 size={16} />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
