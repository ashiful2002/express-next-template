import * as React from "react"
import { FormError } from "./form-error"
import { cn } from "@/lib/utils"

export interface FormCheckboxProps extends Omit<React.ComponentProps<"input">, "type"> {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  error?: string | null
  containerClassName?: string
}

export function FormCheckbox({
  id,
  label,
  description,
  error,
  containerClassName,
  className,
  ...props
}: FormCheckboxProps) {
  const errorId = `${id}-error`
  const descriptionId = `${id}-description`

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          type="checkbox"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : description ? descriptionId : undefined}
          data-slot="checkbox"
          className={cn(
            "mt-0.5 size-4 rounded border border-input accent-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          {...props}
        />
        <div className="space-y-0.5 leading-none">
          <label
            htmlFor={id}
            className="text-xs font-medium text-foreground cursor-pointer select-none"
          >
            {label}
          </label>
          {description && (
            <p id={descriptionId} className="text-[0.6875rem] text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
      <FormError id={errorId} message={error} />
    </div>
  )
}

