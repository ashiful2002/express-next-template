import * as React from "react"
import { AppCard } from "@/components/common/app-card"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons"

const defaultFeatures = [
  "Unified Buttons, Badges & Skeletons",
  "Accessible Forms with auto-labels & error states",
  "Filterable AppTable with pagination & toolbar",
  "Dialogs, Drawers & Action Confirmation Modals",
  "Complete UX States (Empty, Loading, Error, 403, 404)",
  "Strict preservation of your shadcn Mira preset",
]

export interface FeaturesCardProps {
  features?: string[]
}

export function FeaturesCard({
  features = defaultFeatures,
}: FeaturesCardProps) {
  return (
    <AppCard
      title="Design System Features Included"
      description="Designed specifically for rapid SaaS dashboard, settings, and CRUD workflows."
    >
      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        {features.map((feat, i) => (
          <div key={i} className="flex items-center gap-2">
            <HugeiconsIcon
              icon={CheckmarkCircle01Icon}
              className="size-4 shrink-0 text-primary"
            />
            <span className="text-muted-foreground">{feat}</span>
          </div>
        ))}
      </div>
    </AppCard>
  )
}
