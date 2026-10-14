"use server"

import { cookies } from "next/headers"
import { authService } from "@/src/services/auth.service"
import { ApiResponse, AuthResponseData, LoginPayload, SignUpPayload, User } from "@/src/types"

function decodeJwtPayload<T = Record<string, unknown>>(token: string): T | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const base64Url = parts[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload) as T
  } catch {
    return null
  }
}

 
export async function signInAction(payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> {
  const result = await authService.signIn(payload)

  if (result.success && result.data) {
    const cookieStore = await cookies()
    const accessToken = result.data.accessToken || result.data.token
    const refreshToken = result.data.refreshToken
    const isProduction = process.env.NODE_ENV === "production"

    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      cookieStore.set("token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }
  }

  return result
}


export async function signUpAction(payload: SignUpPayload): Promise<ApiResponse<AuthResponseData>> {
  // from here should just show the ui error before send response in server action
  return await authService.signUp(payload)
}


export async function getUserAction(): Promise<User | null> {
  const cookieStore = await cookies()
  const token =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("token")?.value ||
    cookieStore.get("__Secure-better-auth.session_token")?.value ||
    cookieStore.get("better-auth.session_token")?.value

  if (!token) {
    return null
  }

  // 1. Try backend /auth/me
  const response = await authService.getMe(token, cookieStore.toString())
  if (response.success && response.data) {
    return response.data
  }

  // 2. Fallback: decode JWT locally to prevent sudden session logout on transient network drops
  const decoded = decodeJwtPayload<Record<string, string | boolean | undefined>>(token)
  if (decoded) {
    return {
      id: (decoded.id as string) || (decoded.userId as string) || (decoded.sub as string) || "",
      name: (decoded.name as string) || "",
      email: (decoded.email as string) || "",
      role: (decoded.role as User["role"]) || "USER",
      avatar: (decoded.avatar as string) || null,
      emailVerified: typeof decoded.emailVerified === "boolean" ? decoded.emailVerified : true,
      isPremium: typeof decoded.isPremium === "boolean" ? decoded.isPremium : false,
    }
  }

  return null
}


export async function logoutAction(): Promise<ApiResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  const response = await authService.logout(token)

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")
  cookieStore.delete("token")
  cookieStore.delete("__Secure-better-auth.session_token")
  cookieStore.delete("better-auth.session_token")

  return response
}


export async function verifyEmailAction(payload: { email: string; otp: string }): Promise<ApiResponse<AuthResponseData>> {
  const result = await authService.verifyEmail(payload)

  if (result.success && result.data) {
    const cookieStore = await cookies()
    const accessToken = result.data.accessToken || result.data.token
    const refreshToken = result.data.refreshToken
    const isProduction = process.env.NODE_ENV === "production"

    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      cookieStore.set("token", accessToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    if (refreshToken) {
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      })
    }
  }

  return result
}

export async function forgotPasswordAction(payload: { email: string }): Promise<ApiResponse> {
  return await authService.forgotPassword(payload)
}


export async function resetPasswordAction(payload: {
  email: string
  otp: string
  newPassword: string
}): Promise<ApiResponse> {
  return await authService.resetPassword(payload)
}
 
export async function changePasswordAction(payload: {
  currentPassword: string
  newPassword: string
}): Promise<ApiResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  return await authService.changePassword(payload, token)
}

