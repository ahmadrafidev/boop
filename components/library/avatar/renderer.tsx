"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ComponentInstance } from '../types'

interface AvatarRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function AvatarRenderer({ instance, isSelected, onClick }: AvatarRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <Avatar
      key={instance.id}
      className={`${baseClasses} ${
        props.size === "sm" ? "h-8 w-8" : 
        props.size === "lg" ? "h-16 w-16" : 
        "h-10 w-10"
      }`}
      onClick={onClick}
    >
      {props.src && <AvatarImage src={String(props.src)} />}
      <AvatarFallback>{String(props.fallback || "JD")}</AvatarFallback>
    </Avatar>
  )
} 