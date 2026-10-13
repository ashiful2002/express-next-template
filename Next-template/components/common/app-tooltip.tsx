"use client"

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

export interface AppTooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  className?: string
  openDelay?: number
}

export function AppTooltip({
  content,
  children,
  side = "top",
  className,
}: AppTooltipProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="inline-flex outline-none"
      >
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side={side} sideOffset={6}>
          <Popover.Popup
            className={cn(
              "z-50 rounded-md bg-primary px-2.5 py-1 text-xs text-primary-foreground shadow-md transition-all duration-150 animate-in fade-in-0 zoom-in-95",
              className
            )}
          >
            {content}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

