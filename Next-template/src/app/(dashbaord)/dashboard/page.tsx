import { getUserAction } from "@/src/app/_action/auth.action"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

export default async function DashboardPage() {
  const user = await getUserAction()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name || user?.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Account Role</CardDescription>
            <CardTitle className="text-lg">
              {user?.role || "CUSTOMER"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Assigned permissions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Email Status</CardDescription>
            <CardTitle className="text-lg">
              {user?.emailVerified ? "Verified" : "Unverified"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Account Status</CardDescription>
            <CardTitle className="text-lg">
              {user?.status || "ACTIVE"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Active session</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
