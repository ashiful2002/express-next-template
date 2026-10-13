import * as React from "react"
import { Button } from "@/src/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface AppPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number
  totalPages: number
  totalItems?: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function AppPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
  ...props
}: AppPaginationProps) {
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div
      data-slot="pagination"
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 py-3 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {totalItems !== undefined && (
          <span>
            Total: <strong className="text-foreground">{totalItems}</strong> items
          </span>
        )}
        {pageSize && onPageSizeChange && (
          <div className="flex items-center gap-1.5">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-7 rounded border border-input bg-transparent px-1 text-xs"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span>
          Page <strong className="text-foreground">{page}</strong> of{" "}
          <strong className="text-foreground">{Math.max(totalPages, 1)}</strong>
        </span>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canPrev}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!canNext}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

