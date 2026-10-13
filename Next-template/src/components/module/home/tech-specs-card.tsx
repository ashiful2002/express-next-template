import * as React from "react"
import { AppCard } from "@/src/components/common/app-card"

export function TechSpecsCard() {
  return (
    <AppCard
      title="Stack Architecture"
      description="Modern full-stack primitives."
    >
      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Frontend Framework</span>
          <span className="font-mono font-semibold">
            Next.js 16.4 (App Router)
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Styling Engine</span>
          <span className="font-mono font-semibold">Tailwind CSS v4</span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Design System</span>
          <span className="font-mono font-semibold">
            shadcn/ui (base-mira)
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Backend Framework</span>
          <span className="font-mono font-semibold">Express 5.x</span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-2">
          <span className="text-muted-foreground">Database ORM</span>
          <span className="font-mono font-semibold">Prisma 6.x</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Icon System</span>
          <span className="font-mono font-semibold">Hugeicons Core</span>
        </div>
      </div>
    </AppCard>
  )
}
