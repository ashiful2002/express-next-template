import * as React from "react"
import { AppSkeleton } from "@/components/common/app-skeleton"
import { cn } from "@/lib/utils"

export interface CardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number
  columns?: 1 | 2 | 3 | 4
}

const columnStyles = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

export function CardSkeleton({
  count = 3,
  columns = 3,
  className,
  ...props
}: CardSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading cards"
      data-slot="card-skeleton"
      className={cn("grid gap-4", columnStyles[columns], className)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border p-5 space-y-3"
        >
          <div className="flex justify-between items-center">
            <AppSkeleton className="h-4 w-28" />
            <AppSkeleton className="size-6 rounded-full" />
          </div>
          <AppSkeleton className="h-6 w-36" />
          <AppSkeleton className="h-3 w-full" />
          <AppSkeleton className="h-3 w-4/5" />
          <div className="pt-2 border-t flex justify-end">
            <AppSkeleton className="h-7 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

