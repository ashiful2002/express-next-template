import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface InlineLoadingProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: React.ReactNode
  size?: "xs" | "sm" | "md"
}

const sizeMap = {
  xs: "size-3",
  sm: "size-3.5",
  md: "size-4",
}

export function InlineLoading({
  text,
  size = "sm",
  className,
  ...props
}: InlineLoadingProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground", className)}
      {...props}
    >
      <HugeiconsIcon
        icon={Loading03Icon}
        className={cn("animate-spin shrink-0", sizeMap[size])}
        aria-hidden="true"
      />
      {text && <span>{text}</span>}
      <span className="sr-only">Loading...</span>
    </span>
  )
}

