import React from "react"
import { redirect } from "next/navigation"
import { SidebarProvider } from "@/src/components/ui/sidebar"
import { AppSidebar } from "@/src/components/layout/app-sidebar"
import { DashboardTopBar } from "@/src/components/dashboard-topbar"
import { getUserAction } from "../_action/auth.action"

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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-sans">
        <AppSidebar user={user} />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopBar user={user} />
          <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-6">
            {children}
            {admin}
            {super_admin}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
