"use client"

import type { ComponentInstance } from '../types'

export function TextRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm", 
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl"
  }

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium", 
    semibold: "font-semibold",
    bold: "font-bold"
  }

  const Tag = (props.tag as keyof React.JSX.IntrinsicElements) || "p"
  const sizeClass = sizeClasses[props.size as keyof typeof sizeClasses] || sizeClasses.base
  const weightClass = weightClasses[props.weight as keyof typeof weightClasses] || weightClasses.normal

  return (
    <Tag 
      key={instance.id}
      className={`${baseClasses} ${sizeClass} ${weightClass} p-2 rounded`}
      onClick={onClick}
    >
      {String(props.children || "Text content")}
    </Tag>
  )
} 