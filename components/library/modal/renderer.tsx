"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ComponentInstance } from '../types'

interface ModalRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function ModalRenderer({ instance, isSelected, onClick }: ModalRendererProps) {
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{String(props.title || "Modal Title")}</DialogTitle>
            <DialogDescription>
              {String(props.description || "Modal description goes here")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              This is the modal content area where you can place any components or information.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 