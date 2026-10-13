"use client"

import * as React from "react"
import { AppInput, type AppInputProps } from "@/src/components/common/app-input"
import { HugeiconsIcon } from "@hugeicons/react"
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface PasswordInputProps extends Omit<AppInputProps, "type"> {
  showToggle?: boolean
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showToggle = true, disabled, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false)

    const toggleVisibility = () => {
      if (!disabled) {
        setIsVisible((prev) => !prev)
      }
    }

    return (
      <div className="relative flex w-full items-center">
        <AppInput
          ref={ref}
          type={isVisible ? "text" : "password"}
          disabled={disabled}
          className={cn(showToggle && "pr-10", className)}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            aria-label={isVisible ? "Hide password" : "Show password"}
            tabIndex={-1}
            className="absolute right-3 flex size-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          >
            <HugeiconsIcon
              icon={isVisible ? ViewOffSlashIcon : ViewIcon}
              className="size-4"
            />
          </button>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

