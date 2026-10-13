import * as React from "react"
import { FormField } from "./form-field"
import { cn } from "@/src/lib/utils"

export interface FormDatePickerProps extends Omit<React.ComponentProps<"input">, "type"> {
  id: string
  label?: React.ReactNode
  required?: boolean
  error?: string | null
  description?: React.ReactNode
  containerClassName?: string
}

export function FormDatePicker({
  id,
  label,
  required,
  error,
  description,
  containerClassName,
  className,
  ...props
}: FormDatePickerProps) {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      description={description}
      className={containerClassName}
    >
      <input
        id={id}
        type="date"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        data-slot="date-picker"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
    </FormField>
  )
}

