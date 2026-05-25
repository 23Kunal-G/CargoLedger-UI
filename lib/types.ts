/**
 * Global TypeScript Types and Interfaces
 * Centralized type definitions for the entire application
 */

// Auth Types
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  BRANCH_MANAGER = 'branch_manager',
  EMPLOYEE = 'employee',
  CUSTOMER = 'customer',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  branchId?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Branch Types
export interface Branch {
  id: string;
  branchUUID?: string;
  name: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  managerId: string;
  createdAt: string;
  updatedAt: string;
  employeeCount?: number;
}

export type CreateBranchPayload = Omit<
  Branch,
  'id' | 'branchUUID' | 'createdAt' | 'updatedAt' | 'employeeCount'
>

// Shipment Types
export enum ShipmentStatus {
  PENDING = 'PENDING',
  BOOKED = 'BOOKED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  customerId: string;
  fromBranchId: string;
  toBranchId: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  itemDescription: string;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  amount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentMethod?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  notes?: string;
  isBlockchainVerified?: boolean;
  blockchainHash?: string;
  createdAt: string;
  updatedAt: string;
}

// Tracking Types
export interface TrackingEvent {
  id: string;
  shipmentId: string;
  eventType: string;
  location: string;
  branchId: string;
  description: string;
  timestamp: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}

// Payment Types
export interface Payment {
  id: string;
  shipmentId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  method: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Metrics Types
export interface DashboardMetrics {
  totalShipments: number;
  pendingDeliveries: number;
  deliveredToday: number;
  totalRevenue: number;
  changePercentage: number;
}

export interface BranchMetrics {
  totalBranches: number;
  totalManagers: number;
  totalEmployees: number;
  totalShipments: number;
  pendingDeliveries: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Blockchain Types
export interface BlockchainEvent {
  id: string;
  shipmentId: string;
  eventType: string;
  blockHash: string;
  transactionHash: string;
  timestamp: number;
  data: Record<string, any>;
  createdAt: string;
}

export interface SmartContractCall {
  contractAddress: string;
  methodName: string;
  params: any[];
  gasLimit?: number;
  value?: string;
}

// Form Types
export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  errors: FormError[];
  isSubmitting: boolean;
  isSuccess: boolean;
}
