"use client"

import * as React from "react"
import { AppDialog } from "./app-dialog"
import { AppButton } from "@/src/components/common/app-button"
import { Button } from "@/src/components/ui/button"

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  isDestructive?: boolean
  isPending?: boolean
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  children?: React.ReactNode
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false,
  isPending = false,
  onConfirm,
  onCancel,
  children,
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={(val) => {
        if (!isPending) {
          onOpenChange(val)
        }
      }}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleCancel}
          >
            {cancelLabel}
          </Button>
          <AppButton
            type="button"
            variant={isDestructive ? "destructive" : "default"}
            isLoading={isPending}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </AppButton>
        </>
      }
    >
      {children}
    </AppDialog>
  )
}

