import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface InlineErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | null
}

export function InlineError({ message, className, ...props }: InlineErrorProps) {
  if (!message) return null

  return (
    <div
      role="alert"
      data-slot="inline-error"
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-destructive",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={AlertCircleIcon} className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

