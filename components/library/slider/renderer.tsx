"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

interface SliderRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function SliderRenderer({ instance, isSelected, onClick }: SliderRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const sliderValue = Number(props.value) || 50
  const sliderMin = Number(props.min) || 0
  const sliderMax = Number(props.max) || 100
  const step = Number(props.step) || 1

  return (
    <div key={instance.id} className={`${baseClasses} w-64 space-y-3 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <Label className="text-sm font-medium leading-none">
          {String(props.label)}
        </Label>
      )}
      <div className="space-y-2">
        <Slider
          value={[sliderValue]}
          min={sliderMin}
          max={sliderMax}
          step={step}
          disabled={Boolean(props.disabled)}
          className="w-full"
        />
        {Boolean(props.showValue) && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{sliderMin}</span>
            <span className="font-medium">{sliderValue}</span>
            <span>{sliderMax}</span>
          </div>
        )}
      </div>
    </div>
  )
} 