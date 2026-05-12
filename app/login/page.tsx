'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { colors } from '@/lib/colors'
import Link from 'next/link'

/**
 * Login Page
 * Authentication page for users to log in to the system
 */
export default function LoginPage() {
  const router = useRouter()
  const { login, loading, error: authError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ email, password })
      router.push('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayError = error || authError

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundColor: colors.neutral.lightBg,
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 flex justify-center">
          <div
            className="rounded-lg p-3"
            style={{
              backgroundColor: colors.primary.darkBlue,
            }}
          >
            <span
              className="text-2xl font-bold"
              style={{
                color: colors.neutral.white,
              }}
            >
              CL
            </span>
          </div>
        </div>

        {/* Login Card */}
        <Card
          className="border-2"
          style={{
            borderColor: colors.neutral.mediumGray,
            backgroundColor: colors.neutral.white,
          }}
        >
          <CardHeader className="space-y-2">
            <CardTitle
              className="text-center text-2xl"
              style={{
                color: colors.neutral.darkGray,
              }}
            >
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to your CargoLedger account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium"
                  style={{
                    color: colors.neutral.darkGray,
                  }}
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cargoldedger.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="border-2"
                  style={{
                    borderColor: error ? colors.status.cancelled : colors.neutral.mediumGray,
                  }}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium"
                    style={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs"
                    style={{
                      color: colors.primary.darkBlue,
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="border-2"
                  style={{
                    borderColor: error ? colors.status.cancelled : colors.neutral.mediumGray,
                  }}
                />
              </div>

              {/* Error Message */}
              {displayError && (
                <div
                  className="rounded-lg p-3 text-sm"
                  style={{
                    backgroundColor: '#FEE2E2',
                    color: colors.status.cancelled,
                  }}
                >
                  {displayError}
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full font-semibold"
                disabled={isSubmitting || loading}
                style={{
                  backgroundColor: colors.primary.darkBlue,
                  color: colors.neutral.white,
                }}
              >
                {isSubmitting || loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div
              className="mt-6 rounded-lg p-3 text-xs"
              style={{
                backgroundColor: colors.neutral.lightGray,
                color: colors.neutral.secondaryText,
              }}
            >
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>Super Admin: admin@cargo.com / password</p>
              <p>Branch Manager: manager@cargo.com / password</p>
              <p>Employee: emp@cargo.com / password</p>
              <p>Customer: customer@cargo.com / password</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p
          className="mt-6 text-center text-sm"
          style={{
            color: colors.neutral.secondaryText,
          }}
        >
          © 2024 CargoLedger. Smart Logistics. Trusted Delivery.
        </p>
      </div>
    </div>
  )
}
