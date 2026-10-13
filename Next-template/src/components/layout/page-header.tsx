import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumbs?: React.ReactNode
  actions?: React.ReactNode
  badge?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col gap-4 pb-6 border-b border-border/40", className)}
      {...props}
    >
      {breadcrumbs && <div className="text-xs text-muted-foreground">{breadcrumbs}</div>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground max-w-3xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
