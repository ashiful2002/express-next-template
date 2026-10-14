import { NotFoundState } from "@/src/components/states/not-found-state"

export default function NotFound() {
  return (
    <NotFoundState
      fullScreen
      title="Dashboard Page Not Found"
      description="The page you requested does not exist or may have been relocated."
      homeHref="/dashboard"
      homeLabel="Back to Dashboard"
    />
  )
}
