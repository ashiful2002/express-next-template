export type UserRole =
  | "PLATFORM_ADMIN"
  | "SUPER_ADMIN"
  | "ADMIN"
  | "OWNER"
  | "EMPLOYEE"
  | "USER"
  | "TRADER"
  | "CUSTOMER"

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED"

export interface User {
  id: string
  name?: string
  email: string
  role: UserRole
  image?: string | null
  avatar?: string | null
  phone?: string | null
  emailVerified?: boolean
  isPremium?: boolean
  status?: UserStatus
  needPasswordChange?: boolean
  createdAt?: string
  updatedAt?: string
}

// Backward-compatibility alias
export type IUser = User

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: any
  errorMessages?: any[]
  errorSources?: Array<{ path?: string; message: string }>
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type ApiErrorResponse = ApiResponse<never>

export interface LoginPayload {
  email: string
  password: string
}

export interface SignUpPayload {
  name: string
  email: string
  password: string
  businessName?: string
}

export interface AuthResponseData {
  user: User
  token?: string
  accessToken?: string
  refreshToken?: string
}
