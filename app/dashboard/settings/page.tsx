'use client'

import { Bell, Lock, User, Sliders, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { colors } from '@/lib/colors'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/**
 * Settings Page
 * User and system settings
 */
export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const settingsSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your personal information',
      items: [
        { label: 'First Name', value: user?.firstName || '', type: 'text' },
        { label: 'Last Name', value: user?.lastName || '', type: 'text' },
        { label: 'Email', value: user?.email || '', type: 'email', disabled: true },
        { label: 'Phone', value: user?.phone || '', type: 'tel' },
      ],
    },
    {
      icon: Lock,
      title: 'Security Settings',
      description: 'Keep your account secure',
      items: [
        { label: 'Current Password', value: '', type: 'password' },
        { label: 'New Password', value: '', type: 'password' },
        { label: 'Confirm Password', value: '', type: 'password' },
      ],
    },
    {
      icon: Bell,
      title: 'Notification Settings',
      description: 'Control how you receive notifications',
      toggles: [
        { label: 'Email Notifications', value: true },
        { label: 'Shipment Updates', value: true },
        { label: 'Payment Alerts', value: false },
        { label: 'Weekly Reports', value: true },
      ],
    },
    {
      icon: Sliders,
      title: 'Application Settings',
      description: 'Customize your experience',
      options: [
        { label: 'Theme', options: ['Light', 'Dark', 'Auto'], selected: 'Light' },
        { label: 'Language', options: ['English', 'Hindi', 'Bengali'], selected: 'English' },
        { label: 'Timezone', options: ['IST', 'UTC', 'EST'], selected: 'IST' },
      ],
    },
  ]

  return (
    <div className="space-y-6 p-6 sm:p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold"
          style={{
            color: colors.neutral.darkGray,
          }}
        >
          Settings
        </h1>
        <p
          className="mt-2 text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{
                  backgroundColor: colors.primary.darkBlue,
                }}
              >
                <User size={20} style={{ color: colors.neutral.white }} />
              </div>
              <div>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your personal information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-sm font-medium text-foreground"
                    style={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    First Name
                  </label>
                  <Input
                    type="text"
                    defaultValue={user?.firstName || ''}
                    className="mt-1 border-2"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                    }}
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-foreground"
                    style={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    Last Name
                  </label>
                  <Input
                    type="text"
                    defaultValue={user?.lastName || ''}
                    className="mt-1 border-2"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                    }}
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-foreground"
                    style={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    defaultValue={user?.email || ''}
                    disabled
                    className="mt-1 border-2"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                    }}
                  />
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-foreground"
                    style={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    Phone
                  </label>
                  <Input
                    type="tel"
                    defaultValue={user?.phone || ''}
                    className="mt-1 border-2"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  style={{
                    backgroundColor: colors.primary.darkBlue,
                    color: colors.neutral.white,
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{
                  backgroundColor: colors.status.warning,
                }}
              >
                <Lock size={20} style={{ color: colors.neutral.white }} />
              </div>
              <div>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Keep your account secure</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  className="text-sm font-medium text-foreground"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  className="mt-1 border-2"
                  style={{
                    borderColor: colors.neutral.mediumGray,
                  }}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium text-foreground"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="mt-1 border-2"
                  style={{
                    borderColor: colors.neutral.mediumGray,
                  }}
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium text-foreground"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  className="mt-1 border-2"
                  style={{
                    borderColor: colors.neutral.mediumGray,
                  }}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  style={{
                    backgroundColor: colors.primary.darkBlue,
                    color: colors.neutral.white,
                  }}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{
                  backgroundColor: colors.status.info,
                }}
              >
                <Bell size={20} style={{ color: colors.neutral.white }} />
              </div>
              <div>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how you receive updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Email Notifications', enabled: true },
                { label: 'Shipment Updates', enabled: true },
                { label: 'Payment Alerts', enabled: false },
                { label: 'Weekly Reports', enabled: true },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium text-foreground"
                    style={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    {notif.label}
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      defaultChecked={notif.enabled}
                      className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-gray-300 transition-colors checked:bg-green-500"
                      style={{
                        backgroundColor: notif.enabled
                          ? colors.status.success
                          : colors.neutral.mediumGray,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Application Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{
                  backgroundColor: colors.status.pending,
                }}
              >
                <Sliders size={20} style={{ color: colors.neutral.white }} />
              </div>
              <div>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  className="text-sm font-medium text-foreground"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  Theme
                </label>
                <Select defaultValue="light">
                  <SelectTrigger
                    className="mt-1 border-2"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                    }}
                  >
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  className="text-sm font-medium text-foreground"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  Language
                </label>
                <Select defaultValue="english">
                  <SelectTrigger
                    className="mt-1 border-2"
                    style={{
                      borderColor: colors.neutral.mediumGray,
                    }}
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="bengali">Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card
          style={{
            borderColor: colors.status.cancelled,
            borderWidth: '2px',
          }}
        >
          <CardHeader>
            <CardTitle
              style={{
                color: colors.status.cancelled,
              }}
            >
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              style={{
                borderColor: colors.status.cancelled,
                color: colors.status.cancelled,
              }}
            >
              <LogOut size={16} className="mr-2" />
              Logout from all devices
            </Button>
            <Button
              variant="outline"
              className="w-full"
              style={{
                borderColor: colors.status.cancelled,
                color: colors.status.cancelled,
              }}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
