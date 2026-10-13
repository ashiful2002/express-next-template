import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Home01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
}

export interface PageBreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  showHome?: boolean
  homeHref?: string
}

export function PageBreadcrumbs({
  items,
  showHome = true,
  homeHref = "/",
  className,
  ...props
}: PageBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      data-slot="page-breadcrumbs"
      className={cn("flex items-center text-xs text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {showHome && (
          <li className="flex items-center gap-1.5">
            <Link
              href={homeHref}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <HugeiconsIcon icon={Home01Icon} className="size-3.5" />
              <span className="sr-only">Home</span>
            </Link>
            {items.length > 0 && (
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-3 text-muted-foreground/60"
                aria-hidden="true"
              />
            )}
          </li>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors truncate max-w-[140px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "truncate max-w-[160px] sm:max-w-none",
                    isLast && "font-medium text-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-3 text-muted-foreground/60"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

