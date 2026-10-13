import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Settings02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface MaintenanceStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  estimatedTime?: string
  fullScreen?: boolean
}

export function MaintenanceState({
  title = "System Under Scheduled Maintenance",
  description = "We are performing scheduled infrastructure upgrades to improve system performance and reliability.",
  estimatedTime,
  fullScreen = true,
  className,
  ...props
}: MaintenanceStateProps) {
  return (
    <div
      role="region"
      aria-label="Maintenance status"
      data-slot="maintenance-state"
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center",
        fullScreen ? "min-h-[70vh]" : "min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400">
        <HugeiconsIcon icon={Settings02Icon} className="size-7" />
      </div>

      <span className="mt-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        System Maintenance
      </span>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1.5 max-w-md text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>

      {estimatedTime && (
        <div className="mt-4 rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">
          Estimated completion: <strong className="text-foreground">{estimatedTime}</strong>
        </div>
      )}
    </div>
  )
}
