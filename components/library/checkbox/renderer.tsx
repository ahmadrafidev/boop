"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

export function CheckboxRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} flex items-center space-x-2 p-2 rounded`} onClick={onClick}>
      <Checkbox 
        id={instance.id}
        checked={Boolean(props.checked)}
        disabled={Boolean(props.disabled)}
      />
      <Label htmlFor={instance.id}>
        {String(props.label || "Checkbox label")}
      </Label>
    </div>
  )
} 