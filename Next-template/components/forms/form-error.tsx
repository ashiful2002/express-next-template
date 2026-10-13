import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string | null
}

export function FormError({ message, className, id, ...props }: FormErrorProps) {
  if (!message) return null

  return (
    <p
      id={id}
      role="alert"
      data-slot="form-error"
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium text-destructive",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={AlertCircleIcon} className="size-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  )
}

