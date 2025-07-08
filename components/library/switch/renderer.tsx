"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

interface SwitchRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function SwitchRenderer({ instance, isSelected, onClick }: SwitchRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} flex items-center space-x-2 p-2 rounded`} onClick={onClick}>
      <Switch
        id={`switch-${instance.id}`}
        checked={Boolean(props.checked)}
        disabled={Boolean(props.disabled)}
      />
      <Label
        htmlFor={`switch-${instance.id}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {String(props.label || "Switch")}
      </Label>
    </div>
  )
} 