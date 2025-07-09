"use client"

import { Progress } from "@/components/ui/progress"
import type { ComponentInstance } from '../types'

export function ProgressRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} w-80 space-y-2 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <div className="flex justify-between text-sm">
          <span>{String(props.label)}</span>
          <span>{props.value}%</span>
        </div>
      )}
      <Progress value={Number(props.value) || 0} className="w-full" />
    </div>
  )
} 