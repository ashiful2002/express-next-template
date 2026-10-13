"use client"

import * as React from "react"
import { Dialog } from "@base-ui/react/dialog"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface AppDialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
  className?: string
  children?: React.ReactNode
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-[calc(100vw-2rem)] sm:max-w-4xl",
}

export function AppDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  size = "md",
  showCloseButton = true,
  className,
  children,
}: AppDialogProps) {
  return (
    <Dialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger render={trigger as React.ReactElement} />}
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-150 animate-in fade-in-0" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Popup
            className={cn(
              "relative w-full rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xl transition-all duration-150 animate-in fade-in-0 zoom-in-95",
              sizeMap[size],
              className
            )}
          >
            {showCloseButton && (
              <Dialog.Close
                aria-label="Close dialog"
                className="absolute right-4 top-4 rounded-sm p-1 text-muted-foreground transition-opacity hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
              </Dialog.Close>
            )}

            {(title || description) && (
              <div className="mb-4 space-y-1 pr-6">
                {title && (
                  <Dialog.Title className="text-lg font-semibold tracking-tight text-foreground">
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

            <div className="space-y-4">{children}</div>

            {footer && (
              <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-border/40 pt-4">
                {footer}
              </div>
            )}
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

