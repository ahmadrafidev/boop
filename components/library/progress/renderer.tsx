"use client"

import { Progress } from "@/components/ui/progress"
import type { ComponentInstance } from '../types'

interface ProgressRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function ProgressRenderer({ instance, isSelected, onClick }: ProgressRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const value = Number(props.value) || 50
  const max = Number(props.max) || 100
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div key={instance.id} className={`${baseClasses} w-64 space-y-2 p-2 rounded`} onClick={onClick}>
      <Progress value={percentage} className="w-full" />
      {Boolean(props.showLabel) && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
} 