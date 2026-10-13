import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface BackButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  label?: React.ReactNode
}

export function BackButton({
  href = "/",
  label = "Back",
  className,
  ...props
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
      {...props}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
      <span>{label}</span>
    </Link>
  )
}
