/**
 * Centralized, human-understandable error formatting utility for Workmate.
 * Translates backend API responses, database constraint codes, and network exceptions
 * into clear, user-friendly English.
 */

export interface NormalizedError {
  message: string
  fieldErrors?: Record<string, string>
}

/**
 * Maps raw backend technical strings, codes, and database constraints into
 * polished, friendly language.
 */
export function sanitizeErrorMessage(rawMessage: string): string {
  if (!rawMessage || typeof rawMessage !== "string") {
    return "Something went wrong. Please try again."
  }

  const msg = rawMessage.trim()
  const lower = msg.toLowerCase()

  // 1. Password / Credentials / Login
  if (
    lower.includes("password does not matched") ||
    lower.includes("email password does not matched") ||
    lower.includes("invalid email or password") ||
    lower.includes("invalid_email_or_password") ||
    lower.includes("credentials") ||
    lower.includes("invalid password")
  ) {
    return "Incorrect email or password. Please verify your credentials and try again."
  }

  if (lower.includes("current password does not match")) {
    return "Your current password does not match our records. Please verify and try again."
  }

  // 2. Duplicates / Unique Constraints (Prisma P2002)
  if (lower.includes("p2002") || lower.includes("unique constraint")) {
    if (lower.includes("email")) {
      return "An account or customer with this email address already exists."
    }
    if (lower.includes("phone")) {
      return "A customer with this phone number already exists."
    }
    if (lower.includes("jobnumber") || lower.includes("job_number")) {
      return "A job with this job number already exists."
    }
    if (lower.includes("invoicenumber") || lower.includes("invoice_number")) {
      return "An invoice with this number already exists."
    }
    return "A record with this information already exists."
  }

  // 3. Foreign Key / Record in Use (Prisma P2003)
  if (
    lower.includes("p2003") ||
    lower.includes("foreign key") ||
    lower.includes("linked to other")
  ) {
    return "Cannot delete or modify this item because it is linked to existing records (e.g., jobs or invoices)."
  }

  // 4. Record Not Found (Prisma P2025)
  if (
    lower.includes("p2025") ||
    lower.includes("not found") ||
    lower.includes("record to update not found")
  ) {
    return "The requested record could not be found or has already been removed."
  }

  // 5. Authentication / Session Expiration
  if (
    lower.includes("jwt expired") ||
    lower.includes("tokenexpired") ||
    lower.includes("no session token") ||
    lower.includes("no access token") ||
    lower.includes("invalid access token") ||
    lower.includes("session has ended")
  ) {
    return "Your session has expired. Please sign in again."
  }

  // 6. Authorization / Permissions (403)
  if (
    lower.includes("forbidden") ||
    lower.includes("do not have permission") ||
    lower.includes("unauthorized access")
  ) {
    return "You don't have permission to perform this action. Please check with your account administrator."
  }

  // 7. Network / Server Offline
  if (
    lower.includes("failed to fetch") ||
    lower.includes("fetch failed") ||
    lower.includes("network error") ||
    lower.includes("econnrefused") ||
    lower.includes("unable to connect to the server")
  ) {
    return "Unable to connect to the server. Please check your internet connection and try again."
  }

  // 8. Internal Server Errors
  if (
    lower.includes("internal server error") ||
    lower.includes("prisma") ||
    lower.includes("syntaxerror") ||
    lower.includes("cannot read properties of")
  ) {
    return "An unexpected server error occurred. Please try again shortly."
  }

  // 9. Generic "Zod Validation Error" wrapper
  if (lower === "zod validation error" || lower === "validation error") {
    return "Please check the highlighted form fields and try again."
  }

  // Return the original message if it is already user-facing
  return msg
}

/**
 * Extracts a human-understandable error message from any API response or error object.
 */
export function formatErrorMessage(
  resultOrError: any,
  fallbackMessage = "Something went wrong. Please try again."
): string {
  if (!resultOrError) {
    return fallbackMessage
  }

  // If a string was thrown/passed
  if (typeof resultOrError === "string") {
    return sanitizeErrorMessage(resultOrError)
  }

  // If it's a standard JS Error
  if (resultOrError instanceof Error) {
    return sanitizeErrorMessage(resultOrError.message || fallbackMessage)
  }

  // Check errorSources array (standard backend API response)
  if (
    Array.isArray(resultOrError.errorSources) &&
    resultOrError.errorSources.length > 0
  ) {
    const firstErr = resultOrError.errorSources[0]
    const msg = typeof firstErr === "string" ? firstErr : firstErr?.message
    if (msg) {
      return sanitizeErrorMessage(msg)
    }
  }

  // Check errorMessages array (alternative API response format)
  if (
    Array.isArray(resultOrError.errorMessages) &&
    resultOrError.errorMessages.length > 0
  ) {
    const firstErr = resultOrError.errorMessages[0]
    const msg = typeof firstErr === "string" ? firstErr : firstErr?.message
    if (msg) {
      return sanitizeErrorMessage(msg)
    }
  }

  // Check top-level message
  if (
    resultOrError.message &&
    typeof resultOrError.message === "string" &&
    resultOrError.message.toLowerCase() !== "zod validation error"
  ) {
    return sanitizeErrorMessage(resultOrError.message)
  }

  // Check nested error object
  if (
    resultOrError.error?.message &&
    typeof resultOrError.error.message === "string"
  ) {
    return sanitizeErrorMessage(resultOrError.error.message)
  }

  return fallbackMessage
}

/**
 * Extracts a map of field-specific errors from backend errorSources.
 * Useful for binding directly into React Hook Form errors.
 */
export function extractFieldErrors(
  resultOrError: any
): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  if (!resultOrError || !Array.isArray(resultOrError.errorSources)) {
    return fieldErrors
  }

  for (const source of resultOrError.errorSources) {
    if (source?.path && source?.message) {
      // Map path to top-level or dot-notation field name
      const field = String(source.path).replace(/^body\./, "")
      fieldErrors[field] = sanitizeErrorMessage(source.message)
    }
  }

  return fieldErrors
}

