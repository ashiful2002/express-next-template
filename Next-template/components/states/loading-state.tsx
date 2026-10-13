import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  fullScreen?: boolean
}

export function LoadingState({
  message = "Loading...",
  description,
  icon,
  fullScreen = false,
  className,
  ...props
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      data-slot="loading-state"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        fullScreen ? "min-h-[70vh]" : "min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted/60 text-primary">
        {icon ?? <HugeiconsIcon icon={Loading03Icon} className="size-6 animate-spin" />}
      </div>
      <h4 className="mt-4 text-sm font-semibold text-foreground">{message}</h4>
      {description && (
        <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  )
}

