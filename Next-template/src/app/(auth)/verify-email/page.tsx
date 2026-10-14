"use client"

import React, { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
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
import { verifyEmailAction } from "../../_action/auth.action"
import { toast } from "@/src/components/common/app-toast"

function VerifyEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState(searchParams.get("email") || "")
  const [otp, setOtp] = useState("")
  const [hasError, setHasError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!email) {
      toast.error("Please provide your email address.")
      return
    }
    if (otp.length < 6) {
      setHasError(true)
      toast.error("Please enter all 6 digits of your verification code.")
      return
    }

    setHasError(false)
    setIsSubmitting(true)

    try {
      const res = await verifyEmailAction({ email, otp })
      if (!res.success) {
        throw new Error(res.message || "Verification failed.")
      }
      toast.success("Email verified successfully!", {
        description: "Redirecting to your profile...",
      })
      setTimeout(() => {
        router.push("/dashboard/profile")
      }, 1200)
    } catch (err: unknown) {
      setHasError(true)
      if (err instanceof Error) {
        toast.error(err.message)
      } else {
        toast.error("Verification failed. Please check your OTP code.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <BackButton href="/sign-up" label="Back to register" />

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
                  if (hasError) setHasError(false)
                }}
                error={hasError}
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
            href="/sign-up"
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
