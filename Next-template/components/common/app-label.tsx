import * as React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface AppLabelProps extends React.ComponentProps<typeof Label> {
  required?: boolean
}

export function AppLabel({ children, required = false, className, ...props }: AppLabelProps) {
  return (
    <Label className={cn("inline-flex items-center gap-1", className)} {...props}>
      <span>{children}</span>
      {required && (
        <span className="text-destructive font-medium" aria-hidden="true">
          *
        </span>
      )}
    </Label>
  )
}

