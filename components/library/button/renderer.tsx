"use client"

import { Button } from "@/components/ui/button"
import type { ComponentInstance } from '../types'

export function ButtonRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <Button 
      key={instance.id} 
      variant={(props.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link") || "default"} 
      size={(props.size as "default" | "sm" | "lg" | "icon") || "default"} 
      className={baseClasses} 
      onClick={onClick}
      disabled={Boolean(props.disabled)}
    >
      {String(props.children || "Button")}
    </Button>
  )
} 