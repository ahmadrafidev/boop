"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

interface RadioButtonRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function RadioButtonRenderer({ instance, isSelected, onClick }: RadioButtonRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const options = Array.isArray(props.options) ? props.options : ["Option 1", "Option 2", "Option 3"]

  return (
    <div key={instance.id} className={`${baseClasses} space-y-3 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <Label className="text-sm font-medium leading-none">
          {String(props.label)}
        </Label>
      )}
      <RadioGroup 
        defaultValue={String(props.defaultValue || options[0])}
        disabled={Boolean(props.disabled)}
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`radio-${instance.id}-${index}`} />
            <Label htmlFor={`radio-${instance.id}-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
} 