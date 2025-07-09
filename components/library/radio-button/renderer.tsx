"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

export function RadioButtonRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const options = props.options ? String(props.options).split(',').map(opt => opt.trim()) : ['Option 1', 'Option 2']

  return (
    <div key={instance.id} className={`${baseClasses} space-y-2 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <Label className="text-sm font-medium">{String(props.label)}</Label>
      )}
      <RadioGroup value={String(props.value || "")} disabled={Boolean(props.disabled)}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${instance.id}-${index}`} />
            <Label htmlFor={`${instance.id}-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
} 