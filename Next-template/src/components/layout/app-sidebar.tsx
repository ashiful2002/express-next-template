import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode
  footer?: React.ReactNode
  collapsed?: boolean
}

export function AppSidebar({
  header,
  footer,
  collapsed = false,
  className,
  children,
  ...props
}: AppSidebarProps) {
  return (
    <aside
      data-slot="app-sidebar"
      className={cn(
        "flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-200",
        collapsed ? "w-16" : "w-64",
        "h-screen sticky top-0 shrink-0",
        className
      )}
      {...props}
    >
      {header && (
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          {header}
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {children}
      </div>
      {footer && (
        <div className="border-t border-sidebar-border p-3">
          {footer}
        </div>
      )}
    </aside>
  )
}

