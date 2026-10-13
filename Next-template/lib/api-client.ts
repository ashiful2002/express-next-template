import { ApiResponse, ApiErrorResponse } from "@/types"

export class ApiClientError extends Error {
  status: number
  errorSources?: Array<{ path: string; message: string }>

  constructor(
    status: number,
    message: string,
    errorSources?: Array<{ path: string; message: string }>
  ) {
    super(message)
    this.name = "ApiClientError"
    this.status = status
    this.errorSources = errorSources
  }
}

interface CustomRequestInit extends RequestInit {
  _retry?: boolean
}

const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  }
  return "http://localhost:5000/api/v1"
}

let isRefreshing = false
let refreshSubscribers: Array<(success: boolean) => void> = []

const subscribeTokenRefresh = (cb: (success: boolean) => void) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (success: boolean) => {
  refreshSubscribers.forEach((cb) => cb(success))
  refreshSubscribers = []
}

async function tryRefreshToken(): Promise<boolean> {
  const baseUrl = getBaseUrl()
  try {
    const res = await fetch(`${baseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    })
    return res.ok
  } catch {
    return false
  }
}

async function request<T>(
  endpoint: string,
  options: CustomRequestInit = {}
): Promise<ApiResponse<T>> {
  const baseUrl = getBaseUrl()
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}/${endpoint.replace(/^\//, "")}`

  const headers = new Headers(options.headers || {})

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  let response: Response
  try {
    response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    })
  } catch {
    throw new ApiClientError(
      0,
      "Unable to connect to the backend server. Please make sure the backend server is running and try again."
    )
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    data = null
  }

  // Auto-refresh token on 401 Unauthorized for protected endpoints
  if (
    response.status === 401 &&
    !options._retry &&
    !endpoint.includes("/auth/sign-in") &&
    !endpoint.includes("/auth/sign-up") &&
    !endpoint.includes("/auth/refresh-token")
  ) {
    if (!isRefreshing) {
      isRefreshing = true
      const success = await tryRefreshToken()
      isRefreshing = false
      onRefreshed(success)

      if (success) {
        return request<T>(endpoint, { ...options, _retry: true })
      }
    } else {
      // Queue requests until refresh finishes
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(async (success) => {
          if (success) {
            try {
              const res = await request<T>(endpoint, {
                ...options,
                _retry: true,
              })
              resolve(res)
            } catch (err) {
              reject(err)
            }
          } else {
            const errorData = data as ApiErrorResponse | null
            reject(
              new ApiClientError(
                response.status,
                errorData?.message || "Session expired",
                errorData?.errorSources
              )
            )
          }
        })
      })
    }
  }

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null
    const message =
      errorData?.message || `Request failed with status ${response.status}`
    throw new ApiClientError(response.status, message, errorData?.errorSources)
  }

  return data as ApiResponse<T>
}

export const apiClient = {
  get: <T>(endpoint: string, options?: CustomRequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: CustomRequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: CustomRequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown, options?: CustomRequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: CustomRequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
}
