"use client"

import type React from "react"
import type { ComponentDefinition, ComponentInstance, ComponentProps } from "@/app/page"
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
  componentDefinitions: ComponentDefinition[]
  onSelectInstance: (instance: ComponentInstance | null) => void
  onUpdatePosition: (instanceId: string, position: { x: number; y: number }) => void
  onClearCanvas: () => void
  onAddToCanvas: (componentDef: ComponentDefinition) => void
  previewProps?: ComponentProps
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
            variant={(props.variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link") || "default"} 
            size={(props.size as "default" | "sm" | "lg" | "icon") || "default"} 
            className={baseClasses} 
            onClick={onClick}
            disabled={Boolean(props.disabled)}
          >
            {String(props.children || "Button")}
          </Button>
        )
      case "Card":
        return (
          <Card key={instance.id} className={`${baseClasses} w-64`} onClick={onClick}>
            <CardHeader>
              <CardTitle className="text-lg">{String(props.title || "Card Title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{String(props.content || "Card content")}</p>
            </CardContent>
          </Card>
        )
      case "Badge":
        return (
          <Badge 
            key={instance.id} 
            variant={(props.variant as "default" | "secondary" | "destructive" | "outline") || "default"} 
            className={baseClasses} 
            onClick={onClick}
          >
            {String(props.children || "Badge")}
          </Badge>
        )
      case "Input":
        return (
          <Input
            key={instance.id}
            placeholder={String(props.placeholder || "Enter text...")}
            type={(props.type as "text" | "email" | "password" | "number") || "text"}
            disabled={Boolean(props.disabled)}
            className={`${baseClasses} w-64`}
            onClick={onClick}
            readOnly
          />
        )
      case "Alert":
        return (
          <Alert key={instance.id} variant={(props.variant as "default" | "destructive") || "default"} className={`${baseClasses} w-80`} onClick={onClick}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{String(props.title || "Alert Title")}</AlertTitle>
            <AlertDescription>{String(props.description || "Alert description")}</AlertDescription>
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
  componentDefinitions,
  onSelectInstance,
  onUpdatePosition,
  onClearCanvas,
  onAddToCanvas,
  previewProps,
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
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, e.clientX - rect.left - 50) // Account for element center
    const y = Math.max(0, e.clientY - rect.top - 25)
    
    // Check if it's a new component being added
    const componentType = e.dataTransfer.getData("component/type")
    if (componentType) {
      // Find the component definition and add it to canvas
      const componentDef = componentDefinitions.find(def => def.type === componentType)
      
      if (componentDef) {
        onAddToCanvas(componentDef)
      }
      return
    }
    
    // Otherwise, it's an existing component being moved
    const instanceId = e.dataTransfer.getData("text/plain")
    if (instanceId) {
      onUpdatePosition(instanceId, { x, y })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.types.includes("component/type")
    e.dataTransfer.dropEffect = componentType ? "copy" : "move"
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear selection if clicking on the canvas itself, not on child elements
    if (e.target === e.currentTarget) {
      onSelectInstance(null)
    }
  }

  if (activeView === "component" && selectedComponent) {
    // Component preview mode - fullscreen documentation style
    return (
      <div className="flex-1 bg-background overflow-auto">
        {/* Header Section */}
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{selectedComponent.name}</h1>
                  <Badge variant="secondary" className="text-xs">
                    Component
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {selectedComponent.description}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAddToCanvas(selectedComponent)}
                className="flex items-center gap-2"
              >
                Add to Canvas
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Preview Section */}
          <section>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Preview</h2>
                <p className="text-sm text-muted-foreground">
                  Interactive preview of the {selectedComponent.name} component with default props.
                </p>
              </div>
              
              {/* Component Showcase */}
              <div className="relative">
                <div className="rounded-lg border border-border bg-background p-12 min-h-[300px] flex items-center justify-center">
                  <div className="scale-125 transform-gpu">
                    {renderComponent(
                      {
                        id: "preview",
                        type: selectedComponent.type,
                        props: previewProps || selectedComponent.defaultProps,
                        position: { x: 0, y: 0 },
                      },
                      false,
                      () => {},
                    )}
                  </div>
                </div>
                {/* Grid background for showcase */}
                <div 
                  className="absolute inset-0 opacity-5 rounded-lg pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                      linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px'
                  }}
                />
              </div>
            </div>
          </section>
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
