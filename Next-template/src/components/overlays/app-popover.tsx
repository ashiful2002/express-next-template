"use client"

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { cn } from "@/src/lib/utils"

export interface AppPopoverProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  content: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  className?: string
}

export function AppPopover({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  content,
  side = "bottom",
  align = "start",
  className,
}: AppPopoverProps) {
  return (
    <Popover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger render={trigger as React.ReactElement} />
      <Popover.Portal>
        <Popover.Positioner side={side} align={align} sideOffset={6}>
          <Popover.Popup
            className={cn(
              "z-50 w-72 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none transition-all duration-150 animate-in fade-in-0 zoom-in-95",
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

