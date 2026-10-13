import * as React from "react"
import { FormField } from "./form-field"
import { AppInput, type AppInputProps } from "@/src/components/common/app-input"

export interface FormInputProps extends Omit<AppInputProps, "id"> {
  id: string
  label?: React.ReactNode
  required?: boolean
  error?: string | null
  description?: React.ReactNode
  containerClassName?: string
}

export function FormInput({
  id,
  label,
  required,
  error,
  description,
  containerClassName,
  className,
  ...props
}: FormInputProps) {
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
      <AppInput
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : description ? descriptionId : undefined}
        className={className}
        {...props}
      />
    </FormField>
  )
}

