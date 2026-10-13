import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface AppTableProps extends React.HTMLAttributes<HTMLTableElement> {
  striped?: boolean
  hoverable?: boolean
}

export function AppTable({
  className,
  striped = false,
  hoverable = true,
  children,
  ...props
}: AppTableProps) {
  return (
    <div className="relative w-full overflow-auto rounded-lg border border-border">
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm",
          striped && "[&_tbody_tr:nth-child(even)]:bg-muted/30",
          hoverable && "[&_tbody_tr:hover]:bg-muted/50",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b bg-muted/40", className)}
      {...props}
    />
  )
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

export function TableFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle text-xs font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-3 align-middle text-xs [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    />
  )
}

export function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

