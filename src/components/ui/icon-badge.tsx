"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        secondary: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        info: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        default: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface IconBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBadgeVariants> {
  icon?: React.ReactNode
}

export function IconBadge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: IconBadgeProps) {
  return (
    <div className={cn(iconBadgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  )
} 