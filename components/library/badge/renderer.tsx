"use client"

import { Badge } from "@/components/ui/badge"
import type { ComponentInstance } from '../types'

interface BadgeRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function BadgeRenderer({ instance, isSelected, onClick }: BadgeRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <Badge 
      key={instance.id} 
      variant={(props.variant as "default" | "secondary" | "destructive" | "outline") || "default"} 
      className={baseClasses} 
      onClick={onClick}
    >
      {String(props.children || "Badge")}
    </Badge>
  )
} 