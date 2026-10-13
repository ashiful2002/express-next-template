import * as React from "react"
import { PageSection } from "@/components/layout/page-section"
import { SectionHeader } from "@/components/layout/section-header"
import { StatCard } from "@/components/data-display/stat-card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Rocket01Icon,
  Shield01Icon,
  Database01Icon,
  DashboardSquare01Icon,
} from "@hugeicons/core-free-icons"

export interface MetricsGridProps {
  isAuthenticated: boolean
  role?: string
}

export function MetricsGrid({ isAuthenticated, role }: MetricsGridProps) {
  return (
    <PageSection>
      <SectionHeader
        title="Template System Health & Telemetry"
        description="Modular data-display and telemetry indicators reflecting live runtime state."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
        <StatCard
          title="Frontend Components"
          value="49 Units"
          trend={{ value: "+100%", direction: "up", label: "all verified" }}
          icon={<HugeiconsIcon icon={DashboardSquare01Icon} className="size-5" />}
        />
        <StatCard
          title="Backend Architecture"
          value="Express 5"
          description="Prisma + PostgreSQL"
          icon={<HugeiconsIcon icon={Database01Icon} className="size-5" />}
        />
        <StatCard
          title="Auth Integration"
          value={isAuthenticated ? "Authenticated" : "Guest Mode"}
          description={
            isAuthenticated && role
              ? `Role: ${role}`
              : "JWT Cookies Ready"
          }
          icon={<HugeiconsIcon icon={Shield01Icon} className="size-5" />}
        />
        <StatCard
          title="Production Build"
          value="Optimal (0 Errors)"
          trend={{ value: "100%", direction: "up", label: "type-check passed" }}
          icon={<HugeiconsIcon icon={Rocket01Icon} className="size-5" />}
        />
      </div>
    </PageSection>
  )
}

