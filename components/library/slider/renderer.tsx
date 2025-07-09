"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

export function SliderRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} w-80 space-y-2 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <div className="flex justify-between">
          <Label>{String(props.label)}</Label>
          <span className="text-sm text-muted-foreground">{props.value}</span>
        </div>
      )}
      <Slider
        value={[Number(props.value) || 50]}
        max={Number(props.max) || 100}
        min={Number(props.min) || 0}
        step={Number(props.step) || 1}
        disabled={Boolean(props.disabled)}
        className="w-full"
      />
    </div>
  )
} 