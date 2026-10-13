import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { GithubIcon, TwitterIcon, Linkedin01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@/lib/utils"

export interface FooterLink {
  label: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export const defaultFooterSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Documentation", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
    ],
  },
]

export interface AppFooterProps {
  brandName?: string
  brandDescription?: string
  logoSrc?: string
  sections?: FooterSection[]
  className?: string
}

export function AppFooter({
  brandName = "Acme SaaS",
  brandDescription = "The modern starter foundation for building scalable, high-performance web applications and SaaS products.",
  logoSrc = "/ai-logo.png",
  sections = defaultFooterSections,
  className,
}: AppFooterProps) {
  return (
    <footer className={cn("border-t border-border bg-muted/20 text-muted-foreground", className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand info */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-foreground group">
              <div className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/30 shadow-xs transition-transform group-hover:scale-105">
                <Image
                  src={logoSrc}
                  alt={brandName}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-base font-bold">{brandName}</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {brandDescription}
            </p>
            <div className="flex items-center gap-3 pt-2 text-foreground/70">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex size-8 items-center justify-center rounded-md border border-border bg-background hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <HugeiconsIcon icon={GithubIcon} className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex size-8 items-center justify-center rounded-md border border-border bg-background hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <HugeiconsIcon icon={TwitterIcon} className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 items-center justify-center rounded-md border border-border bg-background hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <HugeiconsIcon icon={Linkedin01Icon} className="size-4" />
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row text-xs">
          <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
