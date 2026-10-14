"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"

export interface NavItem {
  title: string
  url: string
  icon?: LucideIcon | React.ComponentType<{ className?: string }>
  roles?: string[]
  badge?: string
  isImplemented?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

interface NavMainProps {
  groups: NavGroup[]
  userRole?: string
}

export function NavMain({ groups, userRole }: NavMainProps) {
  const pathname = usePathname()

  return (
    <>
      {groups.map((group) => {
        // Filter items based on user role
        const visibleItems = group.items.filter((item) => {
          if (!item.roles || item.roles.length === 0) return true
          if (!userRole) return false
          return item.roles.includes(userRole)
        })

        if (visibleItems.length === 0) return null

        return (
          <SidebarGroup key={group.label} className="py-2">
            {group.label && (
              <SidebarGroupLabel className="text-[11px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleItems.map((item) => {
                  const Icon = item.icon
                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/dashboard" &&
                      item.url !== "#" &&
                      pathname.startsWith(item.url))

                  return (
                    <SidebarMenuItem key={item.title}>
                    
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        isActive={isActive}
                        tooltip={item.title}
                        className="font-medium transition-colors py-6"
                      >
                        
                        {Icon && <Icon className="size-8 shrink-0" />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge className="bg-primary/10 text-[10px] font-semibold text-primary">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )
      })}
    </>
  )
}
