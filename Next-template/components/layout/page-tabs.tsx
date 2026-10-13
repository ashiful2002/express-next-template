"use client"

import * as React from "react"
import { Tabs } from "@base-ui/react/tabs"
import { cn } from "@/lib/utils"

export interface TabItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  content?: React.ReactNode
  disabled?: boolean
}

export interface PageTabsProps {
  items: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children?: React.ReactNode
}

export function PageTabs({
  items,
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: PageTabsProps) {
  const initialValue = defaultValue ?? items[0]?.id

  return (
    <Tabs.Root
      defaultValue={initialValue}
      value={value}
      onValueChange={(val) => onValueChange?.(val as string)}
      className={cn("flex flex-col gap-4", className)}
    >
      <Tabs.List className="inline-flex h-9 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-fit max-w-full overflow-x-auto">
        {items.map((item) => (
          <Tabs.Tab
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-xs"
          >
            {item.icon && <span className="size-3.5 shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
            {item.badge && <span className="shrink-0">{item.badge}</span>}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {items.map((item) =>
        item.content ? (
          <Tabs.Panel key={item.id} value={item.id} className="outline-none">
            {item.content}
          </Tabs.Panel>
        ) : null
      )}

      {children}
    </Tabs.Root>
  )
}

