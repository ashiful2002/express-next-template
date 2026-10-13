import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { WifiDisconnected01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface OfflineStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

export function OfflineState({
  title = "You are currently offline",
  description = "Please check your network connection. Some features may not be available until you reconnect.",
  action,
  className,
  ...props
}: OfflineStateProps) {
  return (
    <div
      role="status"
      aria-label="Offline status"
      data-slot="offline-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-border bg-muted/20 p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <HugeiconsIcon icon={WifiDisconnected01Icon} className="size-6" />
      </div>

      <h4 className="mt-3 text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
