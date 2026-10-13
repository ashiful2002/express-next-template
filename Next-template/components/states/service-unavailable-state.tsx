import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ServerIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface ServiceUnavailableStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  onRetry?: () => void
  retryLabel?: string
  fullScreen?: boolean
}

export function ServiceUnavailableState({
  title = "Service Temporarily Unavailable",
  description = "Our servers are currently experiencing high load or undergoing maintenance. Please try again in a few moments.",
  onRetry,
  retryLabel = "Check again",
  fullScreen = true,
  className,
  ...props
}: ServiceUnavailableStateProps) {
  return (
    <div
      role="alert"
      data-slot="service-unavailable-state"
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center",
        fullScreen ? "min-h-[70vh]" : "min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <HugeiconsIcon icon={ServerIcon} className="size-7" />
      </div>

      <span className="mt-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        503 Service Unavailable
      </span>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1.5 max-w-md text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>

      {onRetry && (
        <div className="mt-6">
          <Button type="button" onClick={onRetry} size="sm">
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
