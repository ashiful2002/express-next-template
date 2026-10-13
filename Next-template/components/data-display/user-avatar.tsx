import * as React from "react"
import { cn } from "@/lib/utils"

export interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string | null
  image?: string | null
  size?: "xs" | "sm" | "md" | "lg"
}

const sizeMap = {
  xs: "size-6 text-[0.625rem]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
}

function getInitials(name?: string | null): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function UserAvatar({
  name,
  image,
  size = "md",
  className,
  ...props
}: UserAvatarProps) {
  const [imageError, setImageError] = React.useState(false)

  return (
    <div
      data-slot="user-avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-medium text-muted-foreground select-none",
        sizeMap[size],
        className
      )}
      {...props}
    >
      {image && !imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name ?? "User avatar"}
          onError={() => setImageError(true)}
          className="aspect-square size-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  )
}

