import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface NotFoundStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  homeHref?: string
  homeLabel?: string
  action?: React.ReactNode
  fullScreen?: boolean
}

export function NotFoundState({
  title = "Page not found",
  description = "The page or resource you are looking for does not exist or has been moved.",
  homeHref = "/",
  homeLabel = "Return Home",
  action,
  fullScreen = true,
  className,
  ...props
}: NotFoundStateProps) {
  return (
    <div
      role="region"
      aria-label="Not found"
      data-slot="not-found-state"
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center",
        fullScreen ? "min-h-[70vh]" : "min-h-[220px]",
        className
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <HugeiconsIcon icon={Search02Icon} className="size-7" />
      </div>

      <span className="mt-4 font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        404 Error
      </span>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <Link href={homeHref}>
          <Button type="button" size="sm">
            {homeLabel}
          </Button>
        </Link>
        {action}
      </div>
    </div>
  )
}
