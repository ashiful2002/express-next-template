import * as React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface AppCardProps extends Omit<React.ComponentProps<typeof Card>, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  headerActions?: React.ReactNode
  footer?: React.ReactNode
  contentClassName?: string
}

export function AppCard({
  title,
  description,
  headerActions,
  footer,
  children,
  className,
  contentClassName,
  ...props
}: AppCardProps) {
  const hasHeader = Boolean(title || description || headerActions)

  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      {hasHeader && (
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
          <div className="space-y-1">
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && (
              <CardDescription className="text-xs text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
          {headerActions && <div className="shrink-0">{headerActions}</div>}
        </CardHeader>
      )}
      <CardContent className={cn(hasHeader ? "pt-0" : "p-6", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t bg-muted/20 px-6 py-3 text-xs text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
