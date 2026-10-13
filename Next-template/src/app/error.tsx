"use client"

import * as React from "react"
import { ErrorState } from "@/src/components/states/error-state"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Log error to an error reporting service if configured
    console.error("App Router Error Boundary caught:", error)
  }, [error])

  return (
    <ErrorState
      fullScreen
      title="An unexpected error occurred"
      description="The application encountered an unhandled problem. You can try refreshing the page or repeating the action."
      onRetry={() => reset()}
      retryLabel="Reload page"
    />
  )
}

