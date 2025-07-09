"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentInstance } from '../types'

export function CardRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <Card key={instance.id} className={`${baseClasses} w-80`} onClick={onClick}>
      <CardHeader>
        <CardTitle>{String(props.title || "Card Title")}</CardTitle>
        {props.description && (
          <CardDescription>{String(props.description)}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p>{String(props.content || "Card content goes here.")}</p>
      </CardContent>
    </Card>
  )
} 