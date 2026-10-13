import * as React from "react"
import Link from "next/link"
import { AppCard } from "@/components/common/app-card"
import { AppBadge } from "@/components/common/app-badge"
import { AppButton } from "@/components/common/app-button"
import { StatusBadge } from "@/components/data-display/status-badge"
import { AppAlert } from "@/components/feedback/app-alert"
import type { IUser } from "@/types"

export interface AuthStatusCardProps {
  isLoading: boolean
  isAuthenticated: boolean
  user: IUser | null
  apiUrl: string
  onRequestSignOut: () => void
}

export function AuthStatusCard({
  isLoading,
  isAuthenticated,
  user,
  apiUrl,
  onRequestSignOut,
}: AuthStatusCardProps) {
  return (
    <AppCard
      title="Authentication & API State"
      description="Live connection to your Express backend with HTTP-only cookies and global AuthContext."
      footer={
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>
            API Endpoint:{" "}
            <code className="font-mono text-foreground font-semibold">
              {apiUrl}
            </code>
          </span>
          <StatusBadge status={isAuthenticated ? "success" : "neutral"}>
            {isAuthenticated ? "Connected" : "Ready"}
          </StatusBadge>
        </div>
      }
    >
      {isLoading ? (
        <div className="py-6 text-center text-sm text-muted-foreground animate-pulse">
          Verifying authentication session...
        </div>
      ) : isAuthenticated && user ? (
        <div className="space-y-4">
          <AppAlert
            variant="success"
            title="Active Session Detected"
            description={`You are currently signed in as ${user.name} (${user.email}).`}
          />
          <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-muted/40 p-4 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground">User ID:</span>
              <p className="font-mono font-medium truncate">{user.id}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Assigned Role:</span>
              <p className="font-medium pt-0.5">
                <AppBadge variant="outline">{user.role}</AppBadge>
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>
              <p className="font-medium truncate">{user.email}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Account Status:</span>
              <p className="font-medium pt-0.5">
                <StatusBadge status="success">{user.status}</StatusBadge>
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <AppButton variant="destructive" onClick={onRequestSignOut}>
              Sign Out
            </AppButton>
          </div>
        </div>
      ) : (
        <div className="space-y-4 py-2">
          <p className="text-sm text-muted-foreground">
            No active user session found. Try creating a new account or signing in using your backend auth endpoints.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/login">
              <AppButton variant="default">Sign In to Account</AppButton>
            </Link>
            <Link href="/register">
              <AppButton variant="outline">Create New Account</AppButton>
            </Link>
          </div>
        </div>
      )}
    </AppCard>
  )
}

