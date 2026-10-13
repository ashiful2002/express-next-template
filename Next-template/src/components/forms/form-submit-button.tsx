import * as React from "react"
import { AppButton, type AppButtonProps } from "@/src/components/common/app-button"

export interface FormSubmitButtonProps extends Omit<AppButtonProps, "type"> {
  isSubmitting?: boolean
  submittingText?: string
}

export function FormSubmitButton({
  children = "Submit",
  isSubmitting = false,
  submittingText = "Submitting...",
  isLoading,
  loadingText,
  ...props
}: FormSubmitButtonProps) {
  const loading = isLoading ?? isSubmitting
  const text = loadingText ?? submittingText

  return (
    <AppButton
      type="submit"
      isLoading={loading}
      loadingText={text}
      {...props}
    >
      {children}
    </AppButton>
  )
}

