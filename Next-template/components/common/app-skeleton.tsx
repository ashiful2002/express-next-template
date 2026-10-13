import * as React from "react"
import { cn } from "@/lib/utils"

export type AppSkeletonProps = React.HTMLAttributes<HTMLDivElement>

export function AppSkeleton({ className, ...props }: AppSkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted/60", className)}
      {...props}
    />
  )
}
