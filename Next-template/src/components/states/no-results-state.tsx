import * as React from "react"
import { Button } from "@/src/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface NoResultsStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  query?: string
  title?: React.ReactNode
  description?: React.ReactNode
  onClear?: () => void
  clearLabel?: string
  action?: React.ReactNode
}

export function NoResultsState({
  query,
  title = "No results found",
  description,
  onClear,
  clearLabel = "Clear search & filters",
  action,
  className,
  ...props
}: NoResultsStateProps) {
  const desc =
    description ??
    (query
      ? `No matches found for "${query}". Try adjusting your keywords or clearing active filters.`
      : "No matches found for the current filter criteria. Try adjusting your selections.")

  return (
    <div
      role="region"
      aria-label="No results"
      data-slot="no-results-state"
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/10 p-8 sm:p-12 text-center",
        className
      )}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <HugeiconsIcon icon={Search01Icon} className="size-6" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
        {desc}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        {onClear && (
          <Button type="button" variant="outline" size="sm" onClick={onClear}>
            {clearLabel}
          </Button>
        )}
        {action}
      </div>
    </div>
  )
}
