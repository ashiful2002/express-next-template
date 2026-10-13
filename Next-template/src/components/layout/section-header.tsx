import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

export function SectionHeader({
  title,
  description,
  actions,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-col gap-1 pb-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div>
        <h3 className="text-base font-semibold leading-none text-foreground">{title}</h3>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="shrink-0 pt-2 sm:pt-0">{actions}</div>}
    </div>
  )
}
