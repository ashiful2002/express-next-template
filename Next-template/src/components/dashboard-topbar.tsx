"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { SidebarTrigger } from "@/src/components/ui/sidebar"
import { Separator } from "@/src/components/ui/separator"
import { Button } from "@/src/components/ui/button"
import { UserMenu } from "@/src/components/data-display/user-menu"
import { logoutAction } from "@/src/app/_action/auth.action"

export interface DashboardTopBarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  } | null
}

export function DashboardTopBar({ user }: DashboardTopBarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  // Format breadcrumb title from pathname
  const segments = pathname.split("/").filter(Boolean)
  const currentTitle =
    segments.length > 1
      ? segments[segments.length - 1].replace(/-/g, " ")
      : "Overview"

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 h-4" />
        <div className="flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-foreground capitalize">
            {currentTitle}
          </span>
          {user?.role && (
            <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold text-primary capitalize">
              {user.role.toLowerCase().replace(/_/g, " ")}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Return to home link */}
        <Button
          render={<Link href="/" title="Return to home" />}
          variant="ghost"
          size="icon"
          className="size-8"
        >
          <Home className="size-4" />
          <span className="sr-only">Home</span>
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle theme"
        >
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Separator orientation="vertical" className="mx-1 h-4" />

        {/* User avatar menu */}
        {user && (
          <UserMenu
            user={{
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            }}
            onLogout={async () => {
              await logoutAction()
              router.push("/sign-in")
              router.refresh()
            }}
          />
        )}
      </div>
    </header>
  )
}
