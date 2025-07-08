"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { ComponentInstance } from '../types'

interface AlertRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function AlertRenderer({ instance, isSelected, onClick }: AlertRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <Alert 
      key={instance.id} 
      variant={(props.variant as "default" | "destructive") || "default"} 
      className={`${baseClasses} w-80`} 
      onClick={onClick}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{String(props.title || "Alert Title")}</AlertTitle>
      <AlertDescription>{String(props.description || "Alert description")}</AlertDescription>
    </Alert>
  )
} 