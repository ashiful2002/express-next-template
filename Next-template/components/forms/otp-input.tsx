"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
  className?: string
  error?: boolean
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  autoFocus = true,
  className,
  error = false,
}: OtpInputProps) {
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([])

  // Normalize current digits array
  const digits = React.useMemo(() => {
    const chars = value.split("")
    return Array.from({ length }, (_, i) => chars[i] || "")
  }, [value, length])

  // Focus management
  const focusInput = (index: number) => {
    const target = inputsRef.current[index]
    if (target) {
      target.focus()
      target.select()
    }
  }

  React.useEffect(() => {
    if (autoFocus && !disabled) {
      const firstEmptyIndex = digits.findIndex((d) => !d)
      focusInput(firstEmptyIndex === -1 ? 0 : firstEmptyIndex)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputVal = e.target.value
    // If multiple chars inputted (e.g. Android suggestion)
    if (inputVal.length > 1) {
      handlePastedChars(inputVal, index)
      return
    }

    const char = inputVal.slice(-1) // take only the last typed character
    const newDigits = [...digits]
    newDigits[index] = char

    const combined = newDigits.join("")
    onChange(combined)

    if (char && index < length - 1) {
      focusInput(index + 1)
    }

    if (combined.length === length && !combined.includes("")) {
      onComplete?.(combined)
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Current box is already empty, move to previous and delete
        const newDigits = [...digits]
        newDigits[index - 1] = ""
        onChange(newDigits.join(""))
        focusInput(index - 1)
        e.preventDefault()
      } else if (digits[index]) {
        // Clear current box
        const newDigits = [...digits]
        newDigits[index] = ""
        onChange(newDigits.join(""))
        e.preventDefault()
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault()
      focusInput(index - 1)
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault()
      focusInput(index + 1)
    }
  }

  const handlePastedChars = (pastedText: string, startIndex = 0) => {
    // Keep alphanumeric/digit characters
    const cleanChars = pastedText.replace(/\s+/g, "").split("")
    if (cleanChars.length === 0) return

    const newDigits = [...digits]
    cleanChars.forEach((ch, idx) => {
      const targetIdx = startIndex + idx
      if (targetIdx < length) {
        newDigits[targetIdx] = ch
      }
    })

    const combined = newDigits.join("").slice(0, length)
    onChange(combined)

    const nextIndex = Math.min(startIndex + cleanChars.length, length - 1)
    focusInput(nextIndex)

    if (combined.length === length) {
      onComplete?.(combined)
    }
  }

  const handlePaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    handlePastedChars(pastedData, index)
  }

  return (
    <div
      role="group"
      aria-label="Verification code input"
      className={cn(
        "flex items-center justify-between gap-2 sm:gap-3",
        className
      )}
    >
      {Array.from({ length }).map((_, index) => {
        const val = digits[index] || ""
        const isFilled = Boolean(val)

        return (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="text"
            pattern="[0-9a-zA-Z]*"
            maxLength={length} // allow pasting full OTP directly into any box
            value={val}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            onChange={(e) => handleInputChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={(e) => e.target.select()}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl border text-center font-mono text-lg font-semibold transition-all duration-150 outline-none sm:size-12",
              "border-input/80 bg-background/50 text-foreground shadow-xs",
              "focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20",
              isFilled && "border-primary/60 bg-muted/20",
              error &&
                "border-destructive text-destructive focus:border-destructive focus:ring-destructive/20",
              disabled && "cursor-not-allowed opacity-50"
            )}
          />
        )
      })}
    </div>
  )
}
