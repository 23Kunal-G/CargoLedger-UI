import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  role: "super-admin" | "admin" | "user"
}

interface UserStore {
  user: User | null
  loading: boolean
  fetchUserProfile: () => Promise<void>
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  fetchUserProfile: async () => {
    set({ loading: true })
    try {
      // Mock API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 500))
      const mockUser: User = {
        id: "1",
        name: "Super Admin",
        email: "admin@cargoledger.com",
        role: "super-admin"
      }
      set({ user: mockUser })
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      set({ user: null })
    } finally {
      set({ loading: false })
    }
  },
  setUser: (user) => set({ user })
}))
