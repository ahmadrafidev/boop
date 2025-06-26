"use client"

import type React from "react"
import type { ComponentDefinition, ComponentInstance } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Trash2 } from "lucide-react"

interface CanvasProps {
  activeView: "component" | "canvas"
  selectedComponent: ComponentDefinition | null
  selectedInstance: ComponentInstance | null
  canvasComponents: ComponentInstance[]
  onSelectInstance: (instance: ComponentInstance | null) => void
  onUpdatePosition: (instanceId: string, position: { x: number; y: number }) => void
  onClearCanvas: () => void
}

function renderComponent(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { type, props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  try {
    switch (type) {
      case "Button":
        return (
          <Button 
            key={instance.id} 
            variant={props.variant || "default"} 
            size={props.size || "default"} 
            className={baseClasses} 
            onClick={onClick}
            disabled={props.disabled}
          >
            {props.children || "Button"}
          </Button>
        )
      case "Card":
        return (
          <Card key={instance.id} className={`${baseClasses} w-64`} onClick={onClick}>
            <CardHeader>
              <CardTitle className="text-lg">{props.title || "Card Title"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{props.content || "Card content"}</p>
            </CardContent>
          </Card>
        )
      case "Badge":
        return (
          <Badge 
            key={instance.id} 
            variant={props.variant || "default"} 
            className={baseClasses} 
            onClick={onClick}
          >
            {props.children || "Badge"}
          </Badge>
        )
      case "Input":
        return (
          <Input
            key={instance.id}
            placeholder={props.placeholder || "Enter text..."}
            type={props.type || "text"}
            disabled={props.disabled}
            className={`${baseClasses} w-64`}
            onClick={onClick}
            readOnly
          />
        )
      case "Alert":
        return (
          <Alert key={instance.id} variant={props.variant || "default"} className={`${baseClasses} w-80`} onClick={onClick}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{props.title || "Alert Title"}</AlertTitle>
            <AlertDescription>{props.description || "Alert description"}</AlertDescription>
          </Alert>
        )
      default:
        return (
          <div key={instance.id} className={`${baseClasses} p-4 border rounded bg-muted`} onClick={onClick}>
            <p className="text-sm">Unknown component: {type}</p>
          </div>
        )
    }
  } catch (error) {
    console.error(`Error rendering component ${type}:`, error)
    return (
      <div key={instance.id} className={`${baseClasses} p-4 border rounded bg-destructive/10`} onClick={onClick}>
        <p className="text-sm text-destructive">Error rendering {type}</p>
      </div>
    )
  }
}

export function Canvas({
  activeView,
  selectedComponent,
  selectedInstance,
  canvasComponents,
  onSelectInstance,
  onUpdatePosition,
  onClearCanvas,
}: CanvasProps) {
  const handleDragStart = (e: React.DragEvent, instance: ComponentInstance) => {
    e.dataTransfer.setData("text/plain", instance.id)
    e.dataTransfer.effectAllowed = "move"
    
    // Add visual feedback
    const target = e.target as HTMLElement
    target.style.opacity = "0.5"
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    target.style.opacity = "1"
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const instanceId = e.dataTransfer.getData("text/plain")
    if (!instanceId) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, e.clientX - rect.left - 50) // Account for element center
    const y = Math.max(0, e.clientY - rect.top - 25)

    onUpdatePosition(instanceId, { x, y })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear selection if clicking on the canvas itself, not on child elements
    if (e.target === e.currentTarget) {
      onSelectInstance(null)
    }
  }

  if (activeView === "component" && selectedComponent) {
    // Component preview mode
    return (
      <div className="flex-1 bg-muted/30 flex items-center justify-center p-8">
        <div className="bg-background rounded-lg shadow-sm p-16 max-w-4xl w-full border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">{selectedComponent.name}</h2>
            <p className="text-muted-foreground">{selectedComponent.description}</p>
          </div>
          <div className="flex items-center justify-center">
            <div className="scale-150 transform-gpu">
              {renderComponent(
                {
                  id: "preview",
                  type: selectedComponent.type,
                  props: selectedComponent.defaultProps,
                  position: { x: 0, y: 0 },
                },
                false,
                () => {},
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Canvas mode
  return (
    <div
      className="flex-1 bg-muted/30 relative overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleCanvasClick}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      {canvasComponents.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>
            <p className="text-lg mb-2">Canvas is empty</p>
            <p className="text-sm max-w-md">
              Add components from the sidebar or drag them from the component library to get started
            </p>
          </div>
        </div>
      ) : (
        canvasComponents.map((instance) => (
          <div
            key={instance.id}
            className="absolute transform-gpu"
            style={{
              left: instance.position.x,
              top: instance.position.y,
              zIndex: selectedInstance?.id === instance.id ? 10 : 1,
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, instance)}
            onDragEnd={handleDragEnd}
            onClick={(e) => {
              e.stopPropagation()
              onSelectInstance(instance)
            }}
          >
            {renderComponent(instance, selectedInstance?.id === instance.id, () => onSelectInstance(instance))}
          </div>
        ))
      )}

      {/* Canvas Controls - Bottom Right */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border rounded-lg px-4 py-2 shadow-sm">
        <span className="text-sm text-muted-foreground">
          {canvasComponents.length} component{canvasComponents.length !== 1 ? "s" : ""}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearCanvas} 
          className="flex items-center gap-2"
          disabled={canvasComponents.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </Button>
      </div>
    </div>
  )
}
