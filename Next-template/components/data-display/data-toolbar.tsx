import * as React from "react"
import { cn } from "@/lib/utils"

export interface DataToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  search?: React.ReactNode
  filters?: React.ReactNode
  viewToggle?: React.ReactNode
  actions?: React.ReactNode
}

export function DataToolbar({
  search,
  filters,
  viewToggle,
  actions,
  className,
  children,
  ...props
}: DataToolbarProps) {
  return (
    <div
      data-slot="data-toolbar"
      className={cn(
        "flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {search && <div className="w-full sm:w-64">{search}</div>}
        {filters}
        {children}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {viewToggle}
        {actions}
      </div>
    </div>
  )
}

