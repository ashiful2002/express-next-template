import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/src/components/layout/app-sidebar"
import { getUserAction, logoutAction } from "../_action/auth.action"

export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
  admin,
  super_admin,
}: {
  children: React.ReactNode
  admin?: React.ReactNode
  super_admin?: React.ReactNode
}) {
  const user = await getUserAction()
  if (!user) {
    redirect("/sign-in")
  }
  const role = user?.role

  async function handleLogout() {
    "use server"
    await logoutAction()
    redirect("/sign-in")
  }

  return (
    <div className="flex min-h-screen w-full font-sans bg-background">
      <AppSidebar
        header={
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-sm font-bold">Dashboard</span>
            {role && (
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {role}
              </span>
            )}
          </div>
        }
        footer={
          <form action={handleLogout}>
            <button
              type="submit"
              className="w-full text-left text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out ({user.name || user.email})
            </button>
          </form>
        }
      >
        <nav className="flex flex-col gap-1 text-sm">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-md px-3 py-2 bg-primary/10 font-medium text-primary"
          >
            Overview
          </Link>
        </nav>
      </AppSidebar>

      <main className="flex min-w-0 flex-1 flex-col bg-background">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
          <h1 className="text-sm font-medium text-muted-foreground">
            Welcome, {user.name || user.email}
          </h1>
          <form action={handleLogout}>
            <button
              type="submit"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </header>

        <div className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-6">
          {children}
          {admin}
          {super_admin}
        </div>
      </main>
    </div>
  )
}
