import { getUserAction } from "@/src/app/_action/auth.action"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

export default async function ProfilePage() {
  const user = await getUserAction()

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          View and manage your account credentials and details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Personal information associated with your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">
                Full Name
              </span>
              <p className="text-sm font-semibold">
                {user?.name || "Not provided"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">
                Email Address
              </span>
              <p className="text-sm font-semibold">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">
                Role
              </span>
              <p className="text-sm font-semibold">{user?.role}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">
                Verification
              </span>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {user?.emailVerified ? "Verified" : "Pending"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

