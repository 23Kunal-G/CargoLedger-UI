/**
 * Centralized API Client
 * Handles all HTTP requests with consistent error handling
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse } from './types';

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api') {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Add response interceptor to handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    );
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch<T>(url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): ApiResponse<any> {
    let errorMessage = 'An error occurred';

    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('[ApiClient] Error:', errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }

  /**
   * Token Management
   */
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.instance.defaults.headers.Authorization = `Bearer ${token}`;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
    delete this.instance.defaults.headers.Authorization;
  }

  /**
   * Get instance for custom requests
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

export const apiClient = new ApiClient();
