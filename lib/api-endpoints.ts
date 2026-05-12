/**
 * API Endpoints Configuration
 * Centralized definition of all API endpoints
 */

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
    REGISTER: '/auth/register',
  },

  // User endpoints
  USERS: {
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    GET_BY_ID: (id: string) => `/users/${id}`,
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Branch endpoints
  BRANCHES: {
    LIST: '/branches',
    GET: (id: string) => `/branches/${id}`,
    CREATE: '/branches',
    UPDATE: (id: string) => `/branches/${id}`,
    DELETE: (id: string) => `/branches/${id}`,
    METRICS: '/branches/metrics',
  },

  // Shipment endpoints
  SHIPMENTS: {
    LIST: '/shipments',
    GET: (id: string) => `/shipments/${id}`,
    CREATE: '/shipments',
    UPDATE: (id: string) => `/shipments/${id}`,
    DELETE: (id: string) => `/shipments/${id}`,
    SEARCH: '/shipments/search',
    BY_STATUS: (status: string) => `/shipments/status/${status}`,
    TRACK: (trackingNumber: string) => `/shipments/track/${trackingNumber}`,
    EXPORT: '/shipments/export',
  },

  // Tracking endpoints
  TRACKING: {
    GET_EVENTS: (shipmentId: string) => `/tracking/${shipmentId}/events`,
    CREATE_EVENT: (shipmentId: string) => `/tracking/${shipmentId}/events`,
    TIMELINE: (shipmentId: string) => `/tracking/${shipmentId}/timeline`,
  },

  // Payment endpoints
  PAYMENTS: {
    LIST: '/payments',
    GET: (id: string) => `/payments/${id}`,
    CREATE: '/payments',
    VERIFY: (id: string) => `/payments/${id}/verify`,
    REFUND: (id: string) => `/payments/${id}/refund`,
  },

  // Dashboard endpoints
  DASHBOARD: {
    SUPER_ADMIN: '/dashboard/super-admin',
    BRANCH_MANAGER: '/dashboard/branch-manager',
    EMPLOYEE: '/dashboard/employee',
    CUSTOMER: '/dashboard/customer',
  },

  // Reports endpoints
  REPORTS: {
    SHIPMENT_ANALYTICS: '/reports/shipments',
    BRANCH_PERFORMANCE: '/reports/branches',
    PAYMENT_REPORT: '/reports/payments',
    EXPORT_REPORT: (type: string) => `/reports/${type}/export`,
  },

  // Blockchain endpoints
  BLOCKCHAIN: {
    VERIFY_SHIPMENT: (shipmentId: string) => `/blockchain/verify/${shipmentId}`,
    GET_STATUS: (shipmentId: string) => `/blockchain/status/${shipmentId}`,
    SYNC_EVENT: '/blockchain/sync-event',
    GET_EVENTS: (shipmentId: string) => `/blockchain/events/${shipmentId}`,
  },
};

/**
 * Helper function to construct paginated requests
 */
export const getPaginatedEndpoint = (
  endpoint: string,
  page: number = 1,
  limit: number = 10,
  filters?: Record<string, any>,
): string => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    });
  }

  return `${endpoint}?${params.toString()}`;
};

/**
 * Helper function to construct filter parameters
 */
export const buildFilterParams = (filters: Record<string, any>): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.append(key, String(value));
      }
    }
  });

  return params.toString();
};
