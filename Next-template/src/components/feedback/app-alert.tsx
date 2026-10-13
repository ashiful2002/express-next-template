import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Alert02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export const alertVariants = cva(
  "relative flex w-full gap-3 rounded-lg border p-4 text-xs transition-all",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400 [&_svg]:text-blue-600",
        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 [&_svg]:text-emerald-600",
        warning:
          "border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-300 [&_svg]:text-amber-600",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive [&_svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AppAlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  onDismiss?: () => void
}

const defaultIcons = {
  default: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  destructive: AlertCircleIcon,
}

export function AppAlert({
  title,
  description,
  icon,
  variant = "default",
  onDismiss,
  className,
  children,
  ...props
}: AppAlertProps) {
  const IconDef = defaultIcons[variant ?? "default"]

  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    >
      <div className="shrink-0 pt-0.5">
        {icon ?? <HugeiconsIcon icon={IconDef} className="size-4" aria-hidden="true" />}
      </div>

      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-none tracking-tight">{title}</h5>}
        {description && (
          <div className="text-[0.8125rem] leading-relaxed opacity-90">{description}</div>
        )}
        {children}
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="shrink-0 rounded-sm p-1 text-current opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" />
        </button>
      )}
    </div>
  )
}
