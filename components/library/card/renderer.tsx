"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentInstance } from '../types'

interface CardRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function CardRenderer({ instance, isSelected, onClick }: CardRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <Card key={instance.id} className={`${baseClasses} w-64`} onClick={onClick}>
      <CardHeader>
        <CardTitle className="text-lg">{String(props.title || "Card Title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{String(props.content || "Card content")}</p>
      </CardContent>
    </Card>
  )
} 