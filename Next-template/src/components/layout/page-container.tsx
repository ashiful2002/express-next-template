import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full"
  gutter?: boolean
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
}

export function PageContainer({
  maxWidth = "7xl",
  gutter = true,
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      data-slot="page-container"
      className={cn(
        "mx-auto w-full",
        maxWidthMap[maxWidth],
        gutter && "px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

