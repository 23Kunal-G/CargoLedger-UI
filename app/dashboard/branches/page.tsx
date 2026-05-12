'use client'

import { Plus, MapPin, Users, PhoneIcon, MailIcon, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Branch } from '@/lib/types'
import { colors } from '@/lib/colors'

/**
 * Branches Management Page
 * Manage all logistics branches
 */
export default function BranchesPage() {
  const mockBranches: Branch[] = [
    {
      id: 'kolkata-hq',
      name: 'Kolkata HQ',
      location: 'Kolkata, West Bengal',
      address: '123 Business Park, Salt Lake',
      city: 'Kolkata',
      state: 'West Bengal',
      zipCode: '700091',
      country: 'India',
      phone: '+91-33-4070-1234',
      email: 'kolkata@cargo.com',
      managerId: 'manager1',
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      employeeCount: 45,
    },
    {
      id: 'delhi-hub',
      name: 'Delhi Hub',
      location: 'Delhi',
      address: '456 Tech Center, Noida',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110066',
      country: 'India',
      phone: '+91-11-4560-7890',
      email: 'delhi@cargo.com',
      managerId: 'manager2',
      createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      employeeCount: 38,
    },
    {
      id: 'mumbai-hub',
      name: 'Mumbai Hub',
      location: 'Mumbai, Maharashtra',
      address: '789 Commerce Tower, Fort',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400023',
      country: 'India',
      phone: '+91-22-6170-1111',
      email: 'mumbai@cargo.com',
      managerId: 'manager3',
      createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      employeeCount: 52,
    },
    {
      id: 'bangalore-hub',
      name: 'Bangalore Hub',
      location: 'Bangalore, Karnataka',
      address: '321 Tech Park, Whitefield',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560066',
      country: 'India',
      phone: '+91-80-4140-2222',
      email: 'bangalore@cargo.com',
      managerId: 'manager4',
      createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      employeeCount: 41,
    },
  ]

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
            Branches
          </h1>
          <p
            className="mt-2 text-sm"
            style={{
              color: colors.neutral.secondaryText,
            }}
          >
            Manage logistics branches across the network
          </p>
        </div>
        <Button
          style={{
            backgroundColor: colors.primary.darkBlue,
            color: colors.neutral.white,
          }}
        >
          <Plus size={20} className="mr-2" />
          New Branch
        </Button>
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {mockBranches.map((branch) => (
          <Card key={branch.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="rounded-lg p-2"
                    style={{
                      backgroundColor: colors.primary.darkBlue,
                    }}
                  >
                    <MapPin size={20} style={{ color: colors.neutral.white }} />
                  </div>
                  <div>
                    <CardTitle>{branch.name}</CardTitle>
                    <CardDescription>{branch.location}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Address */}
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{
                    color: colors.neutral.secondaryText,
                  }}
                >
                  ADDRESS
                </p>
                <p className="mt-1 text-sm text-foreground">{branch.address}</p>
                <p
                  className="text-xs"
                  style={{
                    color: colors.neutral.secondaryText,
                  }}
                >
                  {branch.city}, {branch.state} {branch.zipCode}
                </p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <PhoneIcon size={16} style={{ color: colors.primary.darkBlue }} />
                  <div>
                    <p
                      className="text-xs"
                      style={{
                        color: colors.neutral.secondaryText,
                      }}
                    >
                      Phone
                    </p>
                    <p className="text-sm text-foreground">{branch.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon size={16} style={{ color: colors.primary.darkBlue }} />
                  <div>
                    <p
                      className="text-xs"
                      style={{
                        color: colors.neutral.secondaryText,
                      }}
                    >
                      Email
                    </p>
                    <p className="text-sm text-foreground">{branch.email}</p>
                  </div>
                </div>
              </div>

              {/* Employees */}
              <div
                className="flex items-center gap-2 rounded-lg p-3"
                style={{
                  backgroundColor: colors.neutral.lightGray,
                }}
              >
                <Users size={16} style={{ color: colors.primary.darkBlue }} />
                <div>
                  <p
                    className="text-xs"
                    style={{
                      color: colors.neutral.secondaryText,
                    }}
                  >
                    Active Employees
                  </p>
                  <p className="font-semibold text-foreground">{branch.employeeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Branch Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Network Statistics</CardTitle>
          <CardDescription>Performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                Total Branches
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {mockBranches.length}
              </p>
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                Total Employees
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {mockBranches.reduce((sum, b) => sum + (b.employeeCount || 0), 0)}
              </p>
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                Avg Employees/Branch
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {Math.round(
                  mockBranches.reduce((sum, b) => sum + (b.employeeCount || 0), 0) /
                    mockBranches.length,
                )}
              </p>
            </div>
            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: colors.neutral.secondaryText,
                }}
              >
                Network Utilization
              </p>
              <p className="mt-2 text-3xl font-bold text-foreground">87%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
