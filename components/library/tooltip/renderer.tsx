"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import type { ComponentInstance } from '../types'

export function TooltipRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} p-2 rounded`} onClick={onClick}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              {String(props.triggerText || "Hover me")}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{String(props.content || "Tooltip content")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
} 