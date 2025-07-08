"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import type { ComponentInstance } from '../types'

interface TooltipRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function TooltipRenderer({ instance, isSelected, onClick }: TooltipRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <TooltipProvider key={instance.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline"
            className={baseClasses}
            onClick={onClick}
            disabled={Boolean(props.disabled)}
          >
            {String(props.children || "Hover me")}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{String(props.content || "Tooltip content")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 