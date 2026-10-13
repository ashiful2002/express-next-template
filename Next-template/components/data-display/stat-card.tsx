import * as React from "react"
import { AppCard, type AppCardProps } from "@/components/common/app-card"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface StatTrend {
  value: string | number
  direction: "up" | "down" | "neutral"
  label?: string
}

export interface StatCardProps extends Omit<AppCardProps, "title"> {
  title: React.ReactNode
  value: React.ReactNode
  icon?: React.ReactNode
  description?: React.ReactNode
  trend?: StatTrend
}

export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <AppCard
      className={cn("p-5", className)}
      contentClassName="p-0"
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        {icon && (
          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:size-4">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>

        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium",
              trend.direction === "up" && "text-emerald-600 dark:text-emerald-400",
              trend.direction === "down" && "text-destructive",
              trend.direction === "neutral" && "text-muted-foreground"
            )}
          >
            {trend.direction === "up" && (
              <HugeiconsIcon icon={ArrowUp01Icon} className="size-3" />
            )}
            {trend.direction === "down" && (
              <HugeiconsIcon icon={ArrowDown01Icon} className="size-3" />
            )}
            <span>{trend.value}</span>
            {trend.label && (
              <span className="text-[0.6875rem] text-muted-foreground ml-0.5">
                {trend.label}
              </span>
            )}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </AppCard>
  )
}

