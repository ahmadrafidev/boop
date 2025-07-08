"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

interface CheckboxRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function CheckboxRenderer({ instance, isSelected, onClick }: CheckboxRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} flex items-center space-x-2 p-2 rounded`} onClick={onClick}>
      <Checkbox
        id={`checkbox-${instance.id}`}
        checked={Boolean(props.checked)}
        disabled={Boolean(props.disabled)}
      />
      <Label
        htmlFor={`checkbox-${instance.id}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {String(props.label || "Checkbox")}
      </Label>
    </div>
  )
} 