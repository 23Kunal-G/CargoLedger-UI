'use client'

import { useEffect, useState } from 'react'
import { Plus, Eye, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, UserRole } from '@/lib/types'
import { colors } from '@/lib/colors'
import { useRole } from '@/hooks/useRole'
import { Badge } from '@/components/ui/badge'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiList } from '@/lib/api-response'

/**
 * Users Management Page
 * Manage system users and permissions
 */
export default function UsersPage() {
  const { isSuperAdmin } = useRole()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchUsers = async () => {
    setIsLoading(true)
    setError('')

    const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS.LIST)

    if (response.success) {
      setUsers(unwrapApiList<User>(response.data))
    } else {
      setError(response.error || 'Unable to load users')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (userId: string) => {
    if (!isSuperAdmin()) return

    const response = await apiClient.delete(API_ENDPOINTS.USERS.DELETE(userId))

    if (response.success) {
      setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId))
    } else {
      setError(response.error || 'Unable to delete user')
    }
  }

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
          {error && (
            <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
              {error}
            </p>
          )}
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
          <CardDescription>{users.length} total users</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                Loading users...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div className="flex h-32 items-center justify-center">
              <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
                No users found
              </p>
            </div>
          ) : (
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
                {users.map((user) => {
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
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDeleteUser(user.id)}
                              >
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
