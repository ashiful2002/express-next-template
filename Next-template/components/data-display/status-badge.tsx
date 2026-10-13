import * as React from "react"
import { AppBadge, type AppBadgeProps } from "@/components/common/app-badge"

export type CommonStatus =
  | "active"
  | "pending"
  | "completed"
  | "success"
  | "failed"
  | "cancelled"
  | "error"
  | "draft"
  | "inactive"
  | "archived"
  | (string & {})

export interface StatusBadgeProps extends Omit<AppBadgeProps, "variant"> {
  status: CommonStatus
  variantMap?: Record<string, AppBadgeProps["variant"]>
  labelMap?: Record<string, string>
}

const defaultVariantMap: Record<string, AppBadgeProps["variant"]> = {
  active: "success",
  success: "success",
  completed: "success",
  pending: "warning",
  draft: "secondary",
  inactive: "outline",
  archived: "outline",
  failed: "destructive",
  error: "destructive",
  cancelled: "destructive",
}

export function StatusBadge({
  status,
  variantMap = {},
  labelMap = {},
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const normalized = status.toLowerCase()
  const variant = variantMap[normalized] ?? defaultVariantMap[normalized] ?? "default"
  const label = children ?? labelMap[normalized] ?? status

  return (
    <AppBadge variant={variant} className={className} {...props}>
      <span className="size-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      <span className="capitalize">{label}</span>
    </AppBadge>
  )
}

