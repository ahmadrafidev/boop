"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ComponentInstance } from '../types'

export function ModalRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  return (
    <div key={instance.id} className={`${baseClasses} p-2 rounded`} onClick={onClick}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            {String(props.triggerText || "Open Modal")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{String(props.title || "Modal Title")}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              {String(props.content || "Modal content goes here.")}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 