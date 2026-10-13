"use client"

import React, { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/src/hooks/use-auth"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { OtpInput } from "@/src/components/forms/otp-input"
import { BackButton } from "@/src/components/common/back-button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { verifyEmail } = useAuth()

  const [email, setEmail] = useState(searchParams.get("email") || "")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!email) {
      setError("Please provide your email address.")
      return
    }
    if (otp.length < 6) {
      setError("Please enter all 6 digits of your verification code.")
      return
    }

    setError(null)
    setSuccess(null)
    setIsSubmitting(true)

    try {
      await verifyEmail(email, otp)
      setSuccess("Email verified successfully! Redirecting...")
      setTimeout(() => {
        router.push(`/login?email=${encodeURIComponent(email)}`)
      }, 1500)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Verification failed. Please check your OTP code.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <BackButton href="/register" label="Back to register" />

      <Card className="w-full shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Verification Code
          </CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email to confirm your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-md border border-emerald-500/20 bg-emerald-500/15 p-3 text-sm text-emerald-600 dark:text-emerald-400">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Account Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="otp">Verification Code</Label>
              </div>
              <OtpInput
                length={6}
                value={otp}
                onChange={(val) => {
                  setOtp(val)
                  if (error) setError(null)
                }}
                error={Boolean(error)}
                disabled={isSubmitting}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full gap-2 font-medium"
              disabled={isSubmitting || otp.length < 6}
            >
              <span>{isSubmitting ? "Verifying..." : "Verify Code"}</span>
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Didn&apos;t receive a code?{" "}
          <Link
            href="/register"
            className="ml-1 font-medium text-primary hover:underline"
          >
            Try again
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Suspense
        fallback={
          <div className="text-sm text-muted-foreground">Loading...</div>
        }
      >
        <VerifyEmailForm />
      </Suspense>
    </div>
  )
}
