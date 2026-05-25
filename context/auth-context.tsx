'use client'

import React, { createContext, useCallback, useEffect, useState, ReactNode } from 'react'
import { User, AuthState, LoginPayload, UserRole } from '@/lib/types'
import { apiClient } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/api-endpoints'

interface AuthContextType extends AuthState {
  login: (credentials: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

interface BackendUser {
  userUUID?: string
  id?: string
  fullName?: string
  firstName?: string
  lastName?: string
  email: string
  role: string
  branchUUID?: string | null
  branchId?: string | null
  createdAt?: string
  updatedAt?: string
}

interface BackendAuthPayload {
  token: string
  user: BackendUser
}

interface BackendEnvelope<T> {
  success?: boolean
  message?: string
  data?: T
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export interface AuthProviderProps {
  children: ReactNode
}

function isUserRole(role: string): role is UserRole {
  return Object.values(UserRole).includes(role as UserRole)
}

function normalizeUser(user: BackendUser): User {
  const [firstName = '', ...lastNameParts] = (user.fullName || '').trim().split(/\s+/)
  const now = new Date().toISOString()

  if (!isUserRole(user.role)) {
    throw new Error(`Unsupported user role: ${user.role}`)
  }

  return {
    id: user.id || user.userUUID || '',
    email: user.email,
    firstName: user.firstName || firstName,
    lastName: user.lastName || lastNameParts.join(' '),
    role: user.role,
    branchId: user.branchId || user.branchUUID || undefined,
    createdAt: user.createdAt || now,
    updatedAt: user.updatedAt || now,
  }
}

function unwrapBackendData<T>(payload: T | BackendEnvelope<T>): T | undefined {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as BackendEnvelope<T>).data
  }

  return payload as T
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  })

  /**
   * Initialize auth state from localStorage
   */
  useEffect(() => {
    const initializeAuth = () => {
      const token = apiClient.getToken()
      if (token) {
        setState((prev) => ({
          ...prev,
          token,
          isAuthenticated: true,
          loading: false,
        }))
        // Verify token is still valid
        verifyToken()
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
        }))
      }
    }

    initializeAuth()
  }, [])

  /**
   * Verify token validity
   */
  const verifyToken = useCallback(async () => {
    try {
      const response = await apiClient.get<BackendUser | BackendEnvelope<BackendUser>>(
        API_ENDPOINTS.AUTH.VERIFY,
      )
      const backendUser = response.data ? unwrapBackendData<BackendUser>(response.data) : undefined

      if (response.success && backendUser) {
        setState((prev) => ({
          ...prev,
          user: normalizeUser(backendUser),
          isAuthenticated: true,
        }))
      } else {
        apiClient.clearToken()
        setState((prev) => ({
          ...prev,
          token: null,
          user: null,
          isAuthenticated: false,
        }))
      }
    } catch (error) {
      apiClient.clearToken()
      setState((prev) => ({
        ...prev,
        token: null,
        user: null,
        isAuthenticated: false,
      }))
    }
  }, [])

  /**
   * Login user
   */
  const login = useCallback(async (credentials: LoginPayload) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const response = await apiClient.post<BackendAuthPayload | BackendEnvelope<BackendAuthPayload>>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
      )

      const authPayload = response.data
        ? unwrapBackendData<BackendAuthPayload>(response.data)
        : undefined

      if (!response.success || !authPayload) {
        throw new Error(response.error || 'Login failed')
      }

      const { user: backendUser, token } = authPayload
      const user = normalizeUser(backendUser)
      apiClient.setToken(token)

      setState({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed'
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [])

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }))
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      apiClient.clearToken()
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      })
    }
  }, [])

  /**
   * Update user state
   */
  const updateUser = useCallback((user: User) => {
    setState((prev) => ({
      ...prev,
      user,
    }))
  }, [])

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
