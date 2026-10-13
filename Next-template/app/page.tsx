"use client"

import * as React from "react"
import { useAuth } from "@/hooks/use-auth"
import { AppNavbar } from "@/components/shared/app-navbar"
import { AppFooter } from "@/components/shared/app-footer"
import { PageContainer } from "@/components/layout/page-container"
import { ConfirmDialog } from "@/components/overlays/confirm-dialog"
import {
  HeroSection,
  MetricsGrid,
  FeaturesCard,
  TechSpecsCard,
} from "@/components/module/home"

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppNavbar />
      <main className="flex-1">
        <HeroSection isAuthenticated={isAuthenticated} />

        <PageContainer>
          <MetricsGrid isAuthenticated={isAuthenticated} role={user?.role} />

          <div className="mb-12 flex flex-col gap-5 md:flex-row" id="features">
            <FeaturesCard />

            <TechSpecsCard />
          </div>
        </PageContainer>
      </main>
      <AppFooter />

      <ConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="Sign Out of Your Account?"
        description="Are you sure you want to end your current session? You will need to log back in to access protected features."
        confirmLabel="Sign Out"
        isDestructive={true}
        onConfirm={async () => {
          await logout()
          setLogoutDialogOpen(false)
        }}
      />
    </div>
  )
}
