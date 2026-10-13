import * as React from "react"
import Link from "next/link"
import { PageContainer } from "@/src/components/layout/page-container"
import { AppButton } from "@/src/components/common/app-button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  SparklesIcon,
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons"

export interface HeroSectionProps {
  isAuthenticated?: boolean
}

export function HeroSection({ isAuthenticated = false }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-muted/40 to-background py-16 sm:py-24 lg:py-28">
      <PageContainer maxWidth="7xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-6 text-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Build & Ship Your Next SaaS{" "}
            <span className="text-primary underline decoration-primary/30 underline-offset-4">
              10x Faster
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
            A clean, modular full-stack architecture powered by Next.js App
            Router, Express 5, Prisma ORM, and a battle-tested component system.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <AppButton size="lg" className="gap-2">
                  <span>Open Dashboard</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                </AppButton>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <AppButton size="lg" className="gap-2">
                    <span>Start Building Free</span>
                    <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
                  </AppButton>
                </Link>
                <Link href="/login">
                  <AppButton variant="outline" size="lg">
                    Sign In
                  </AppButton>
                </Link>
              </>
            )}
            <a href="#features">
              <AppButton variant="ghost" size="lg">
                Explore Features
              </AppButton>
            </a>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                className="size-4 text-emerald-600 dark:text-emerald-400"
              />
              <span>Next.js 16 + Tailwind v4</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                className="size-4 text-emerald-600 dark:text-emerald-400"
              />
              <span>Express 5 Auth API</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                className="size-4 text-emerald-600 dark:text-emerald-400"
              />
              <span>shadcn/ui Mira System</span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
