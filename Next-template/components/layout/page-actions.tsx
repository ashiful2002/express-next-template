import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end" | "between"
}

const alignMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

export function PageActions({
  align = "end",
  className,
  children,
  ...props
}: PageActionsProps) {
  return (
    <div
      data-slot="page-actions"
      className={cn(
        "flex flex-wrap items-center gap-2",
        alignMap[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

