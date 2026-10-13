import * as React from "react"
import { AppLabel } from "@/src/components/common/app-label"
import { FormError } from "./form-error"
import { cn } from "@/src/lib/utils"

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  label?: React.ReactNode
  required?: boolean
  error?: string | null
  description?: React.ReactNode
}

export function FormField({
  id,
  label,
  required = false,
  error,
  description,
  className,
  children,
  ...props
}: FormFieldProps) {
  const errorId = id ? `${id}-error` : undefined
  const descriptionId = id ? `${id}-description` : undefined

  return (
    <div
      data-slot="form-field"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {label && (
        <AppLabel htmlFor={id} required={required}>
          {label}
        </AppLabel>
      )}
      {children}
      {description && !error && (
        <p id={descriptionId} className="text-[0.75rem] text-muted-foreground">
          {description}
        </p>
      )}
      <FormError id={errorId} message={error} />
    </div>
  )
}

