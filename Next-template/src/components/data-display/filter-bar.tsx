import * as React from "react"
import { Button } from "@/src/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon, FilterIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface ActiveFilter {
  key: string
  label: string
  value: string
}

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeFilters?: ActiveFilter[]
  onRemoveFilter?: (key: string) => void
  onClearAll?: () => void
  actions?: React.ReactNode
}

export function FilterBar({
  activeFilters = [],
  onRemoveFilter,
  onClearAll,
  actions,
  className,
  children,
  ...props
}: FilterBarProps) {
  const hasActiveFilters = activeFilters.length > 0

  return (
    <div
      data-slot="filter-bar"
      className={cn("flex flex-col gap-2.5", className)}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            <HugeiconsIcon icon={FilterIcon} className="size-3.5" />
            <span>Filters:</span>
          </div>
          {children}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-[0.6875rem] text-muted-foreground">Active:</span>
          {activeFilters.map((filter) => (
            <span
              key={filter.key}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-foreground"
            >
              <strong className="font-semibold">{filter.label}:</strong>
              <span>{filter.value}</span>
              {onRemoveFilter && (
                <button
                  type="button"
                  onClick={() => onRemoveFilter(filter.key)}
                  aria-label={`Remove filter ${filter.label}`}
                  className="rounded-full text-muted-foreground hover:text-foreground"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="size-3" />
                </button>
              )}
            </span>
          ))}

          {onClearAll && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Reset all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
