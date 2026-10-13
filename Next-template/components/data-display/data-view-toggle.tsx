import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { GridIcon, Menu01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export type DataViewMode = "table" | "grid"

export interface DataViewToggleProps {
  value: DataViewMode
  onChange: (value: DataViewMode) => void
  className?: string
}

export function DataViewToggle({
  value,
  onChange,
  className,
}: DataViewToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="View mode"
      data-slot="data-view-toggle"
      className={cn(
        "inline-flex h-8 items-center rounded-lg border border-border bg-muted/30 p-0.5",
        className
      )}
    >
      <Button
        type="button"
        size="xs"
        variant={value === "table" ? "secondary" : "ghost"}
        onClick={() => onChange("table")}
        aria-checked={value === "table"}
        role="radio"
        className={cn(
          "h-7 px-2 text-xs",
          value === "table" && "bg-background text-foreground shadow-xs"
        )}
      >
        <HugeiconsIcon icon={Menu01Icon} className="size-3.5 mr-1" />
        <span className="hidden sm:inline">Table</span>
      </Button>

      <Button
        type="button"
        size="xs"
        variant={value === "grid" ? "secondary" : "ghost"}
        onClick={() => onChange("grid")}
        aria-checked={value === "grid"}
        role="radio"
        className={cn(
          "h-7 px-2 text-xs",
          value === "grid" && "bg-background text-foreground shadow-xs"
        )}
      >
        <HugeiconsIcon icon={GridIcon} className="size-3.5 mr-1" />
        <span className="hidden sm:inline">Grid</span>
      </Button>
    </div>
  )
}

