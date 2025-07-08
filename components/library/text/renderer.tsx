"use client"

import type { ComponentInstance } from '../types'

interface TextRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function TextRenderer({ instance, isSelected, onClick }: TextRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const textSizeClasses = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  }
  
  const textVariantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    destructive: "text-destructive"
  }

  return (
    <p
      key={instance.id}
      className={`${baseClasses} ${textSizeClasses[props.size as keyof typeof textSizeClasses] || textSizeClasses.default} ${textVariantClasses[props.variant as keyof typeof textVariantClasses] || textVariantClasses.default} p-2 rounded`}
      onClick={onClick}
    >
      {String(props.children || "Sample text")}
    </p>
  )
} 