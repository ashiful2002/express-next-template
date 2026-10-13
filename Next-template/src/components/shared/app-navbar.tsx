"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/src/hooks/use-auth"
import { AppButton } from "@/src/components/common/app-button"
import { UserMenu } from "@/src/components/data-display/user-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/src/lib/utils"

export interface NavItem {
  label: string
  href: string
  badge?: string
}

export const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export interface AppNavbarProps {
  brandName?: string
  brandTagline?: string
  items?: NavItem[]
  logoSrc?: string
  className?: string
}

export function AppNavbar({
  brandName = "Mukto",
  brandTagline = "Templace",
  items = defaultNavItems,
  logoSrc = "/ai-logo.png",
  className,
}: AppNavbarProps) {
  const pathname = usePathname()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    if (href.startsWith("/#")) {
      return false
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-semibold tracking-tight text-foreground"
          >
            <div className="relative flex size-9 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/30 shadow-xs transition-transform group-hover:scale-105">
              <Image
                src={logoSrc}
                alt={brandName}
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm leading-none font-bold">
                {brandName}
              </span>
              <span className="text-sm leading-none font-bold">
                {brandTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Active Page Indicator */}
          <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
            {items.map((item) => {
              const active = isLinkActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? // bg-primary/10
                        "font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute right-3 bottom-0 left-3 h-0.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-muted-foreground sm:inline-block">
                Signed in as{" "}
                <strong className="text-foreground">
                  {user.name || user.email}
                </strong>
              </span>
              <UserMenu
                user={{
                  name: user.name,
                  email: user.email,
                  role: user.role,
                }}
                onLogout={logout}
              />
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/sign-in">
                <AppButton variant="ghost" size="sm">
                  Sign in
                </AppButton>
              </Link>
              <Link href="/register">
                <AppButton variant="default" size="sm">
                  Get Started
                </AppButton>
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-md border border-border p-1.5 text-foreground hover:bg-muted md:hidden"
          >
            <HugeiconsIcon
              icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon}
              className="size-5"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Active Page Indicator */}
      {mobileMenuOpen && (
        <div className="animate-in border-b border-border bg-background px-4 py-4 slide-in-from-top-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {items.map((item) => {
              const active = isLinkActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="size-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              )
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AppButton variant="outline" className="w-full">
                      Sign in
                    </AppButton>
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AppButton variant="default" className="w-full">
                      Get Started
                    </AppButton>
                  </Link>
                </>
              ) : (
                <AppButton
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Log out
                </AppButton>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
