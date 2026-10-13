import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Shield01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface PermissionDeniedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

export function PermissionDenied({
  title = "Permission Required",
  description = "You do not have the required permissions to view or perform actions in this section.",
  action,
  className,
  ...props
}: PermissionDeniedProps) {
  return (
    <div
      role="region"
      aria-label="Permission Denied"
      data-slot="permission-denied"
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-8 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <HugeiconsIcon icon={Shield01Icon} className="size-5" />
      </div>

      <h4 className="mt-3 text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
