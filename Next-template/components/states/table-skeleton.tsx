import * as React from "react"
import { AppSkeleton } from "@/components/common/app-skeleton"
import { cn } from "@/lib/utils"

export interface TableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
  showHeader?: boolean
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
  ...props
}: TableSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading table data"
      data-slot="table-skeleton"
      className={cn("w-full overflow-hidden rounded-lg border border-border", className)}
      {...props}
    >
      {showHeader && (
        <div className="flex items-center gap-4 border-b bg-muted/40 p-3">
          {Array.from({ length: columns }).map((_, i) => (
            <AppSkeleton key={`head-${i}`} className="h-4 flex-1" />
          ))}
        </div>
      )}

      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={`row-${rowIdx}`} className="flex items-center gap-4 p-3">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <AppSkeleton
                key={`cell-${rowIdx}-${colIdx}`}
                className={cn("h-4 flex-1", colIdx === 0 && "w-1/3 flex-none")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

