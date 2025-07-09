"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

export function TextInputRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} space-y-2 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <Label htmlFor={instance.id}>
          {String(props.label)}
        </Label>
      )}
      <Input
        id={instance.id}
        type={(props.type as string) || "text"}
        placeholder={String(props.placeholder || "")}
        disabled={Boolean(props.disabled)}
        value={String(props.value || "")}
        className="w-full"
      />
    </div>
  )
} 