"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { ComponentInstance } from '../types'

interface MenuRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function MenuRenderer({ instance, isSelected, onClick }: MenuRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} p-2 rounded`} onClick={onClick}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            disabled={Boolean(props.disabled)}
          >
            {String(props.triggerText || "Open Menu")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem>
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
} 