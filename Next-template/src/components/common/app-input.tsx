import * as React from "react"
import { Input } from "@/src/components/ui/input"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface AppInputProps extends React.ComponentProps<typeof Input> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

export function AppInput({
  className,
  startIcon,
  endIcon,
  clearable = false,
  onClear,
  value,
  ...props
}: AppInputProps) {
  const hasValue = value !== undefined && value !== null && value !== ""

  if (!startIcon && !endIcon && !clearable) {
    return <Input className={className} value={value} {...props} />
  }

  return (
    <div className="relative flex w-full items-center">
      {startIcon && (
        <span className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground [&_svg]:size-4">
          {startIcon}
        </span>
      )}
      <Input
        value={value}
        className={cn(
          startIcon && "pl-9",
          (endIcon || (clearable && hasValue)) && "pr-9",
          className
        )}
        {...props}
      />
      {clearable && hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear input"
          className="absolute right-2.5 flex size-4 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus:outline-none"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" />
        </button>
      )}
      {endIcon && !clearable && (
        <span className="pointer-events-none absolute right-3 flex items-center justify-center text-muted-foreground [&_svg]:size-4">
          {endIcon}
        </span>
      )}
    </div>
  )
}

