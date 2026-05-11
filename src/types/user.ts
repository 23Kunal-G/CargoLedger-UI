export type UserRole = "super-admin" | "branch-manager" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  branch?: string
  joinDate: string
}
