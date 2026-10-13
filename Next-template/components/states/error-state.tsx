import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface ErrorStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  onRetry?: () => void
  retryLabel?: string
  action?: React.ReactNode
  fullScreen?: boolean
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
  action,
  fullScreen = false,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      data-slot="error-state"
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center",
        fullScreen ? "min-h-[70vh]" : "min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <HugeiconsIcon icon={AlertCircleIcon} className="size-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>

      {(onRetry || action) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {onRetry && (
            <Button type="button" variant="default" size="sm" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  )
}
