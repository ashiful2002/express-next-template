"use client"

import * as React from "react"
import { Menu } from "@base-ui/react/menu"
import { cn } from "@/src/lib/utils"

export interface DropdownMenuItemConfig {
  id?: string
  label: React.ReactNode
  icon?: React.ReactNode
  destructive?: boolean
  disabled?: boolean
  separator?: boolean
  onClick?: () => void
}

export interface AppDropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItemConfig[]
  align?: "start" | "center" | "end"
  side?: "top" | "bottom" | "left" | "right"
  className?: string
}

export function AppDropdownMenu({
  trigger,
  items,
  align = "end",
  side = "bottom",
  className,
}: AppDropdownMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger render={trigger as React.ReactElement} />
      <Menu.Portal>
        <Menu.Positioner align={align} side={side} sideOffset={4}>
          <Menu.Popup
            className={cn(
              "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none transition-all duration-150 animate-in fade-in-0 zoom-in-95",
              className
            )}
          >
            {items.map((item, index) => {
              if (item.separator) {
                return (
                  <Menu.Separator
                    key={`sep-${index}`}
                    className="-mx-1 my-1 h-px bg-border"
                  />
                )
              }

              return (
                <Menu.Item
                  key={item.id ?? `item-${index}`}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    item.destructive &&
                      "text-destructive hover:bg-destructive/10 hover:text-destructive"
                  )}
                >
                  {item.icon && <span className="size-3.5 shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                </Menu.Item>
              )
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

