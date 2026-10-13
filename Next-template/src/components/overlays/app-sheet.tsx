"use client"

import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export type SheetSide = "top" | "bottom" | "left" | "right"

export interface AppSheetProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  side?: SheetSide
  className?: string
  children?: React.ReactNode
}

const sideStyles: Record<SheetSide, string> = {
  top: "fixed inset-x-0 top-0 border-b max-h-[85vh]",
  bottom: "fixed inset-x-0 bottom-0 border-t max-h-[85vh]",
  left: "fixed inset-y-0 left-0 border-r w-full max-w-sm sm:max-w-md",
  right: "fixed inset-y-0 right-0 border-l w-full max-w-sm sm:max-w-md",
}

export function AppSheet({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  side = "right",
  className,
  children,
}: AppSheetProps) {
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger render={trigger as React.ReactElement} />}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in-0" />
        <Dialog.Popup
          className={cn(
            "z-50 flex flex-col bg-background p-6 text-foreground shadow-2xl transition-transform duration-200",
            sideStyles[side],
            className
          )}
        >
          <Dialog.Close
            aria-label="Close sheet"
            className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground transition-opacity hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
          </Dialog.Close>

          {(title || description) && (
            <div className="mb-4 space-y-1 pr-6">
              {title && (
                <Dialog.Title className="text-lg font-semibold tracking-tight">
                  {title}
                </Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-xs text-muted-foreground">
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto">{children}</div>

          {footer && (
            <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t pt-4">
              {footer}
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

