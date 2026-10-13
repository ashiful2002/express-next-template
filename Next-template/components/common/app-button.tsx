import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface AppButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean
  loadingText?: string
}

export function AppButton({
  children,
  isLoading = false,
  loadingText,
  disabled,
  className,
  ...props
}: AppButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn(isLoading && "cursor-wait", className)}
      {...props}
    >
      {isLoading ? (
        <>
          <HugeiconsIcon
            icon={Loading03Icon}
            className="size-3.5 animate-spin"
            aria-hidden="true"
          />
          <span>{loadingText ?? children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}

