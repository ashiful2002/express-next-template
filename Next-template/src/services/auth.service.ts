import { ApiResponse, AuthResponseData, LoginPayload, SignUpPayload, User } from "../types"
import { fetcher } from "@/src/lib/fetcher"

 
export const authService = {
  
  signUp: async (payload: SignUpPayload): Promise<ApiResponse<AuthResponseData>> => {
    return fetcher<AuthResponseData>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  signIn: async (payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> => {
    return fetcher<AuthResponseData>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  getMe: async (token?: string, cookieHeader?: string): Promise<ApiResponse<User>> => {
    const headers: Record<string, string> = {}
    if (cookieHeader) headers["Cookie"] = cookieHeader

    return fetcher<User>("/auth/me", {
      method: "GET",
      token,
      headers,
      cache: "no-store",
    })
  },

  verifyEmail: async (payload: { email: string; otp: string }): Promise<ApiResponse<AuthResponseData>> => {
    return fetcher<AuthResponseData>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  forgotPassword: async (payload: { email: string }): Promise<ApiResponse> => {
    return fetcher("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  resetPassword: async (payload: {
    email: string
    otp: string
    newPassword: string
  }): Promise<ApiResponse> => {
    return fetcher("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  },

  changePassword: async (
    payload: { currentPassword: string; newPassword: string },
    token?: string
  ): Promise<ApiResponse> => {
    return fetcher("/auth/change-password", {
      method: "POST",
      token,
      body: JSON.stringify(payload),
    })
  },

  logout: async (token?: string): Promise<ApiResponse> => {
    return fetcher("/auth/logout", {
      method: "POST",
      token,
    })
  },

  getGoogleLoginUrl: (redirectPath = "/dashboard"): string => {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") ||
      "http://localhost:5001"
    return `${backendUrl}/api/v1/auth/sign-in/google?redirectPath=${encodeURIComponent(
      redirectPath
    )}`
  },
}
