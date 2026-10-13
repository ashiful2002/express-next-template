import * as React from "react"
import { FormField } from "./form-field"
import { cn } from "@/src/lib/utils"

export interface FormTextareaProps extends React.ComponentProps<"textarea"> {
  id: string
  label?: React.ReactNode
  required?: boolean
  error?: string | null
  description?: React.ReactNode
  containerClassName?: string
  maxLength?: number
}

export function FormTextarea({
  id,
  label,
  required,
  error,
  description,
  containerClassName,
  className,
  maxLength,
  value,
  ...props
}: FormTextareaProps) {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`
  const charCount = typeof value === "string" ? value.length : 0

  return (
    <FormField
      id={id}
      label={label}
      required={required}
      error={error}
      description={description}
      className={containerClassName}
    >
      <div className="relative">
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : description ? descriptionId : undefined}
          data-slot="textarea"
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {maxLength && (
          <div className="mt-1 text-right text-[0.6875rem] text-muted-foreground">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    </FormField>
  )
}

