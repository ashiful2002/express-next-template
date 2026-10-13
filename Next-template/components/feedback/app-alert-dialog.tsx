"use client"

import * as React from "react"
import { AppDialog } from "@/components/overlays/app-dialog"
import { Button } from "@/components/ui/button"

export interface AppAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description: React.ReactNode
  acknowledgeLabel?: string
  onAcknowledge?: () => void
  children?: React.ReactNode
}

export function AppAlertDialog({
  open,
  onOpenChange,
  title,
  description,
  acknowledgeLabel = "Understood",
  onAcknowledge,
  children,
}: AppAlertDialogProps) {
  const handleAcknowledge = () => {
    onAcknowledge?.()
    onOpenChange(false)
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <Button type="button" onClick={handleAcknowledge}>
          {acknowledgeLabel}
        </Button>
      }
    >
      {children}
    </AppDialog>
  )
}

