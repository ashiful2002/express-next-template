import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "@/src/lib/utils"

export interface AppSeparatorProps extends SeparatorPrimitive.Props {
  orientation?: "horizontal" | "vertical"
}

export function AppSeparator({
  orientation = "horizontal",
  className,
  ...props
}: AppSeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  )
}

