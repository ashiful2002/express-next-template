import * as React from "react"
import { FormField } from "./form-field"
import { cn } from "@/src/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface FormSelectProps extends React.ComponentProps<"select"> {
  id: string
  label?: React.ReactNode
  required?: boolean
  error?: string | null
  description?: React.ReactNode
  options?: SelectOption[]
  placeholder?: string
  containerClassName?: string
}

export function FormSelect({
  id,
  label,
  required,
  error,
  description,
  options = [],
  placeholder,
  containerClassName,
  className,
  children,
  ...props
}: FormSelectProps) {
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
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        data-slot="select"
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
        {children}
      </select>
    </FormField>
  )
}

