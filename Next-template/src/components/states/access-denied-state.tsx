import * as React from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Shield01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface AccessDeniedStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  homeHref?: string
  homeLabel?: string
  action?: React.ReactNode
  fullScreen?: boolean
}

export function AccessDeniedState({
  title = "Access Denied",
  description = "You do not have permission to access this resource. Please contact your workspace administrator if you believe this is an error.",
  homeHref = "/",
  homeLabel = "Return Home",
  action,
  fullScreen = true,
  className,
  ...props
}: AccessDeniedStateProps) {
  return (
    <div
      role="region"
      aria-label="Access Denied"
      data-slot="access-denied-state"
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center",
        fullScreen ? "min-h-[70vh]" : "min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
        <HugeiconsIcon icon={Shield01Icon} className="size-7" />
      </div>

      <span className="mt-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        403 Forbidden
      </span>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <Link href={homeHref}>
          <Button type="button" variant="outline" size="sm">
            {homeLabel}
          </Button>
        </Link>
        {action}
      </div>
    </div>
  )
}
