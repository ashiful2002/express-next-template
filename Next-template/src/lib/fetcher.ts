import { ApiResponse } from "@/src/types"
import { formatErrorMessage } from "@/src/utils/error"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5001/api/v1"

export const normalizeUrl = (endpoint: string): string => {
  const base = API_BASE_URL.replace(/\/$/, "")
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  return `${base}${path}`
}

export interface FetcherOptions extends RequestInit {
  token?: string
}

/**
 * Global HTTP requester for all service files (auth.service, user.service, etc.).
 * Standardizes headers, JSON serialization, and friendly error normalization.
 */
export async function fetcher<T = unknown>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<ApiResponse<T>> {
  const url = normalizeUrl(endpoint)
  const headers = new Headers(options.headers || {})

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (options.token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${options.token}`)
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    })

    const result = await res.json().catch(() => ({}))

    if (!res.ok) {
      return {
        success: false,
        message: formatErrorMessage(result, `Request failed (${res.status})`),
        error: result?.error,
        errorSources: result?.errorSources,
      }
    }

    return {
      success: true,
      message: result?.message || "Operation successful",
      data: result?.data ?? result,
    }
  } catch (error: unknown) {
    return {
      success: false,
      message: formatErrorMessage(
        error,
        "Unable to connect to the server. Please check your internet connection."
      ),
    }
  }
}

