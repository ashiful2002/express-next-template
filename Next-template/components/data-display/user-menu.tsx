"use client"

import * as React from "react"
import { UserAvatar } from "./user-avatar"
import { AppDropdownMenu, type DropdownMenuItemConfig } from "@/components/overlays/app-dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout01Icon, UserIcon, Settings02Icon } from "@hugeicons/core-free-icons"

export interface UserMenuProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
  onLogout?: () => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  extraItems?: DropdownMenuItemConfig[]
}

export function UserMenu({
  user,
  onLogout,
  onProfileClick,
  onSettingsClick,
  extraItems = [],
}: UserMenuProps) {
  const items: DropdownMenuItemConfig[] = [
    {
      id: "user-info",
      label: (
        <div className="flex flex-col space-y-0.5 text-left py-1">
          <p className="text-xs font-semibold text-foreground truncate max-w-[160px]">
            {user.name ?? "User"}
          </p>
          <p className="text-[0.6875rem] text-muted-foreground truncate max-w-[160px]">
            {user.email ?? ""}
          </p>
        </div>
      ),
      disabled: true,
    },
    { separator: true, label: "" },
    ...(onProfileClick
      ? [
          {
            id: "profile",
            label: "My Profile",
            icon: <HugeiconsIcon icon={UserIcon} className="size-3.5" />,
            onClick: onProfileClick,
          },
        ]
      : []),
    ...(onSettingsClick
      ? [
          {
            id: "settings",
            label: "Settings",
            icon: <HugeiconsIcon icon={Settings02Icon} className="size-3.5" />,
            onClick: onSettingsClick,
          },
        ]
      : []),
    ...extraItems,
    ...(onLogout
      ? [
          { separator: true, label: "" },
          {
            id: "logout",
            label: "Log out",
            icon: <HugeiconsIcon icon={Logout01Icon} className="size-3.5" />,
            destructive: true,
            onClick: onLogout,
          },
        ]
      : []),
  ]

  return (
    <AppDropdownMenu
      align="end"
      items={items}
      trigger={
        <button
          type="button"
          aria-label="User account menu"
          className="flex items-center gap-2 rounded-full p-0.5 outline-none focus:ring-2 focus:ring-ring"
        >
          <UserAvatar name={user.name} image={user.image} size="sm" />
        </button>
      }
    />
  )
}

