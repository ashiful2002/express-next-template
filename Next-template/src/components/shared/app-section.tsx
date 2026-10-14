import * as React from "react"
import { cn } from "@/src/lib/utils"
import {
  PageContainer,
  type PageContainerProps,
} from "@/src/components/layout/page-container"

export interface AppSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "gradient" | "muted" | "default" | "none"
  padding?: "none" | "sm" | "md" | "lg"
  border?: boolean
  container?: boolean
  containerMaxWidth?: PageContainerProps["maxWidth"]
  containerClassName?: string
}

const variantStyles: Record<NonNullable<AppSectionProps["variant"]>, string> = {
  gradient: "bg-gradient-to-b from-muted/40 to-background",
  muted: "bg-muted/40",
  default: "bg-background",
  none: "",
}

const paddingStyles: Record<NonNullable<AppSectionProps["padding"]>, string> = {
  lg: "py-16 sm:py-24 lg:py-28",
  md: "py-12 sm:py-16 lg:py-20",
  sm: "py-8 sm:py-12",
  none: "",
}

export function AppSection({
  variant = "gradient",
  padding = "lg",
  border = true,
  container = false,
  containerMaxWidth = "7xl",
  containerClassName,
  className,
  children,
  ...props
}: AppSectionProps) {
  const content = container ? (
    <PageContainer maxWidth={containerMaxWidth} className={containerClassName}>
      {children}
    </PageContainer>
  ) : (
    children
  )

  return (
    <section
      data-slot="app-section"
      className={cn(
        "relative overflow-hidden",
        border && "border-b border-border/50",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {content}
    </section>
  )
}

export const Section = AppSection
