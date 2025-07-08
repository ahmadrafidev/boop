"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

interface TextInputRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function TextInputRenderer({ instance, isSelected, onClick }: TextInputRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} w-64 space-y-2 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <Label className="text-sm font-medium leading-none">
          {String(props.label)}
        </Label>
      )}
      <Input
        placeholder={String(props.placeholder || "Enter text...")}
        type={(props.type as "text" | "email" | "password" | "number") || "text"}
        disabled={Boolean(props.disabled)}
        className="w-full"
        readOnly
      />
    </div>
  )
} 