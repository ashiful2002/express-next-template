import * as React from "react"
import { AppSkeleton } from "@/components/common/app-skeleton"
import { cn } from "@/lib/utils"

export interface PageSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  cardsCount?: number
  hasTable?: boolean
}

export function PageSkeleton({
  cardsCount = 4,
  hasTable = true,
  className,
  ...props
}: PageSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading page content"
      data-slot="page-skeleton"
      className={cn("space-y-6 p-4 sm:p-6", className)}
      {...props}
    >
      {/* Header skeleton */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <AppSkeleton className="h-8 w-48" />
          <AppSkeleton className="h-4 w-72" />
        </div>
        <div className="flex gap-2">
          <AppSkeleton className="h-8 w-24" />
          <AppSkeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Cards skeleton */}
      {cardsCount > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: cardsCount }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border p-5 space-y-3">
              <div className="flex justify-between items-center">
                <AppSkeleton className="h-4 w-20" />
                <AppSkeleton className="size-7 rounded-md" />
              </div>
              <AppSkeleton className="h-7 w-28" />
              <AppSkeleton className="h-3 w-36" />
            </div>
          ))}
        </div>
      )}

      {/* Table skeleton */}
      {hasTable && (
        <div className="rounded-xl border border-border p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b">
            <AppSkeleton className="h-5 w-32" />
            <AppSkeleton className="h-7 w-48" />
          </div>
          <div className="space-y-2 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <AppSkeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

