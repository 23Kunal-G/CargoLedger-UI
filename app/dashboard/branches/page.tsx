'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Plus, MapPin, Users, PhoneIcon, MailIcon, Edit2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Branch, CreateBranchPayload } from '@/lib/types'
import { colors } from '@/lib/colors'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'
import { unwrapApiData, unwrapApiList } from '@/lib/api-response'

interface BranchMetricsResponse {
  totalBranches?: number
  totalEmployees?: number
  averageEmployeesPerBranch?: number
  networkUtilization?: number
}

type BranchFormState = CreateBranchPayload

const emptyBranchForm: BranchFormState = {
  name: '',
  location: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  phone: '',
  email: '',
  managerId: '',
}

function getBranchId(branch: Branch) {
  return branch.id || branch.branchUUID || ''
}

/**
 * Branches Management Page
 * Manage all logistics branches
 */
export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [metrics, setMetrics] = useState<BranchMetricsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [branchForm, setBranchForm] = useState<BranchFormState>(emptyBranchForm)
  const [error, setError] = useState('')

  const fetchBranches = async () => {
    setIsLoading(true)
    setError('')

    const [branchesResponse, metricsResponse] = await Promise.all([
      apiClient.get<Branch[]>(API_ENDPOINTS.BRANCHES.LIST),
      apiClient.get<BranchMetricsResponse>(API_ENDPOINTS.BRANCHES.METRICS),
    ])

    if (branchesResponse.success) {
      setBranches(unwrapApiList<Branch>(branchesResponse.data))
    } else {
      setError(branchesResponse.error || 'Unable to load branches')
    }

    if (metricsResponse.success) {
      setMetrics(unwrapApiData(metricsResponse.data) || null)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchBranches()
  }, [])

  const handleDeleteBranch = async (branchId: string) => {
    if (!branchId) return

    const response = await apiClient.delete(API_ENDPOINTS.BRANCHES.DELETE(branchId))

    if (response.success) {
      setBranches((currentBranches) =>
        currentBranches.filter((branch) => getBranchId(branch) !== branchId),
      )
    } else {
      setError(response.error || 'Unable to delete branch')
    }
  }

  const handleCreateBranch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCreating(true)
    setError('')

    const response = await apiClient.post<Branch>(
      API_ENDPOINTS.BRANCHES.CREATE,
      branchForm,
    )

    if (response.success) {
      setBranchForm(emptyBranchForm)
      setIsCreateOpen(false)
      await fetchBranches()
    } else {
      setError(response.error || 'Unable to create branch')
    }

    setIsCreating(false)
  }

  const updateBranchForm = (field: keyof BranchFormState, value: string) => {
    setBranchForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  const totalEmployees = branches.reduce((sum, branch) => sum + (branch.employeeCount || 0), 0)
  const totalBranches = metrics?.totalBranches ?? branches.length
  const averageEmployees =
    metrics?.averageEmployeesPerBranch ??
    (branches.length > 0 ? Math.round(totalEmployees / branches.length) : 0)

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
          {error && (
            <p className="mt-2 text-sm" style={{ color: colors.status.cancelled }}>
              {error}
            </p>
          )}
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              style={{
                backgroundColor: colors.primary.darkBlue,
                color: colors.neutral.white,
              }}
            >
              <Plus size={20} className="mr-2" />
              New Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
            <form onSubmit={handleCreateBranch} className="space-y-5">
              <DialogHeader>
                <DialogTitle>Add New Branch</DialogTitle>
                <DialogDescription>
                  Create a branch record for the logistics network.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="branch-name">Name</Label>
                  <Input
                    id="branch-name"
                    value={branchForm.name}
                    onChange={(event) => updateBranchForm('name', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-location">Location</Label>
                  <Input
                    id="branch-location"
                    value={branchForm.location}
                    onChange={(event) => updateBranchForm('location', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="branch-address">Address</Label>
                  <Input
                    id="branch-address"
                    value={branchForm.address}
                    onChange={(event) => updateBranchForm('address', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-city">City</Label>
                  <Input
                    id="branch-city"
                    value={branchForm.city}
                    onChange={(event) => updateBranchForm('city', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-state">State</Label>
                  <Input
                    id="branch-state"
                    value={branchForm.state}
                    onChange={(event) => updateBranchForm('state', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-zip">Zip Code</Label>
                  <Input
                    id="branch-zip"
                    value={branchForm.zipCode}
                    onChange={(event) => updateBranchForm('zipCode', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-country">Country</Label>
                  <Input
                    id="branch-country"
                    value={branchForm.country}
                    onChange={(event) => updateBranchForm('country', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-phone">Phone</Label>
                  <Input
                    id="branch-phone"
                    value={branchForm.phone}
                    onChange={(event) => updateBranchForm('phone', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch-email">Email</Label>
                  <Input
                    id="branch-email"
                    type="email"
                    value={branchForm.email}
                    onChange={(event) => updateBranchForm('email', event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="branch-manager">Manager ID</Label>
                  <Input
                    id="branch-manager"
                    value={branchForm.managerId}
                    onChange={(event) => updateBranchForm('managerId', event.target.value)}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? 'Creating...' : 'Create Branch'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Branches Grid */}
      {isLoading ? (
        <Card>
          <CardContent className="flex h-32 items-center justify-center">
            <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
              Loading branches...
            </p>
          </CardContent>
        </Card>
      ) : branches.length === 0 ? (
        <Card>
          <CardContent className="flex h-32 items-center justify-center">
            <p className="text-sm" style={{ color: colors.neutral.secondaryText }}>
              No branches found
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {branches.map((branch) => {
            const branchId = getBranchId(branch)

            return (
              <Card key={branchId || branch.email}>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteBranch(branchId)}
                      >
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
            )
          })}
        </div>
      )}

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
                {totalBranches}
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
                {metrics?.totalEmployees ?? totalEmployees}
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
                {averageEmployees}
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
              <p className="mt-2 text-3xl font-bold text-foreground">
                {metrics?.networkUtilization ?? 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
