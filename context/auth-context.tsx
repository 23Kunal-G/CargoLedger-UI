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

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export interface AuthProviderProps {
  children: ReactNode
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
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.VERIFY)
      if (response.success && response.data) {
        setState((prev) => ({
          ...prev,
          user: response.data as User,
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
      const response = await apiClient.post<{ user: User; token: string }>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
      )

      if (!response.success || !response.data) {
        throw new Error(response.error || 'Login failed')
      }

      const { user, token } = response.data
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
