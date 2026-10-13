"use client"

import * as React from "react"
import { AppAlert, type AppAlertProps } from "./app-alert"
import { cn } from "@/lib/utils"

export interface ToastMessage {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: AppAlertProps["variant"]
}

type ToastListener = (toasts: ToastMessage[]) => void

let toastsList: ToastMessage[] = []
let listeners: ToastListener[] = []

export const toast = {
  show: (
    description: React.ReactNode,
    options?: { title?: React.ReactNode; variant?: AppAlertProps["variant"]; duration?: number }
  ) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastMessage = {
      id,
      description,
      title: options?.title,
      variant: options?.variant ?? "default",
    }
    toastsList = [...toastsList, newToast]
    listeners.forEach((l) => l(toastsList))

    const duration = options?.duration ?? 4000
    if (duration > 0) {
      setTimeout(() => {
        toast.dismiss(id)
      }, duration)
    }
  },

  success: (description: React.ReactNode, title?: React.ReactNode) => {
    toast.show(description, { title, variant: "success" })
  },

  error: (description: React.ReactNode, title?: React.ReactNode) => {
    toast.show(description, { title, variant: "destructive" })
  },

  info: (description: React.ReactNode, title?: React.ReactNode) => {
    toast.show(description, { title, variant: "info" })
  },

  warning: (description: React.ReactNode, title?: React.ReactNode) => {
    toast.show(description, { title, variant: "warning" })
  },

  dismiss: (id: string) => {
    toastsList = toastsList.filter((t) => t.id !== id)
    listeners.forEach((l) => l(toastsList))
  },
}

export function AppToaster({ className }: { className?: string }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      listeners = listeners.filter((l) => l !== setToasts)
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <aside
      aria-live="polite"
      aria-label="Notifications"
      className={cn(
        "fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 pointer-events-none",
        className
      )}
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto shadow-lg animate-in slide-in-from-bottom-2">
          <AppAlert
            title={t.title}
            description={t.description}
            variant={t.variant}
            onDismiss={() => toast.dismiss(t.id)}
          />
        </div>
      ))}
    </aside>
  )
}

