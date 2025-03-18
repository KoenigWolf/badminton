"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        primary:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        secondary:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        destructive:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        success:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        warning:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        info:
          "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
        orange:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
        pink:
          "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
        indigo:
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants } 