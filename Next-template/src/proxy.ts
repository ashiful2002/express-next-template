import { NextResponse, NextRequest } from "next/server"

function decodeJwt<T = Record<string, unknown>>(token: string): T | null {
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

const ALLOWED_ROLES = [ "ADMIN", "SUPER_ADMIN",]

export default async function proxy(request: NextRequest) {
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value

  if (!token) {
    const loginUrl = new URL("/sign-in", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const decoded = decodeJwt<{ role?: string; exp?: number }>(token)

    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      const loginUrl = new URL("/sign-in", request.url)
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
      const res = NextResponse.redirect(loginUrl)
      res.cookies.delete("accessToken")
      res.cookies.delete("token")
      res.cookies.delete("__Secure-better-auth.session_token")
      res.cookies.delete("better-auth.session_token")
      return res
    }

    if (decoded?.role && !ALLOWED_ROLES.includes(decoded.role)) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  } catch {
    // If token is opaque session token (e.g. better-auth session), allow server components to verify
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
  ],
}
