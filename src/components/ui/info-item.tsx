import * as React from "react"
import { cn } from "@/lib/utils"

interface InfoItemProps {
  icon?: React.ReactNode
  title: string
  content: React.ReactNode
  className?: string
}

export function InfoItem({ icon, title, content, className }: InfoItemProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {icon && (
        <div className="shrink-0 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
        <div className="text-gray-600 dark:text-gray-300">{content}</div>
      </div>
    </div>
  )
} 