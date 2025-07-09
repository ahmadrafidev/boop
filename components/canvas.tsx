"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { ComponentDefinition, ComponentInstance, ComponentProps } from "@/components/library/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import { getComponentRenderer } from "@/components/library/registry"

interface CanvasProps {
  activeView: "documentation" | "canvas"
  selectedComponent: ComponentDefinition | null
  selectedInstance: ComponentInstance | null
  canvasComponents: ComponentInstance[]
  componentDefinitions: ComponentDefinition[]
  onSelectInstance: (instance: ComponentInstance | null) => void
  onUpdatePosition: (instanceId: string, position: { x: number; y: number }) => void
  onClearCanvas: () => void
  onAddToCanvas: (componentDef: ComponentDefinition, position?: { x: number; y: number }) => void
  previewProps?: ComponentProps
}

function renderComponent(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  try {
    // Get the renderer from the registry
    const Renderer = getComponentRenderer(instance.type)
    
    if (!Renderer) {
      return (
        <div key={instance.id} className="p-4 border rounded bg-muted cursor-pointer" onClick={onClick}>
          <p className="text-sm">Unknown component: {instance.type}</p>
        </div>
      )
    }

    // Use the modular renderer
    return (
      <Renderer
        key={instance.id}
        instance={instance}
        isSelected={isSelected}
        onClick={onClick}
      />
    )
  } catch (error) {
    console.error(`Error rendering component ${instance.type}:`, error)
    return (
      <div key={instance.id} className="p-4 border rounded bg-destructive/10 cursor-pointer" onClick={onClick}>
        <p className="text-sm text-destructive">Error rendering {instance.type}</p>
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
  const [isDragOver, setIsDragOver] = useState(false)
  const [isClientMounted, setIsClientMounted] = useState(false)
  
  useEffect(() => {
    setIsClientMounted(true)
  }, [])

  const handleDragStart = (e: React.DragEvent, instance: ComponentInstance) => {
    e.dataTransfer.setData("application/x-instance-id", instance.id)
    e.dataTransfer.effectAllowed = "move"
    
    // Add visual feedback
    const target = e.target as HTMLElement
    target.style.opacity = "0.5"
    
    // Store the offset from mouse to component top-left for accurate positioning
    const rect = target.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    e.dataTransfer.setData("application/x-offset-x", offsetX.toString())
    e.dataTransfer.setData("application/x-offset-y", offsetY.toString())
  }

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.target as HTMLElement
    target.style.opacity = "1"
  }

    const handleDrop = (e: React.DragEvent) => {
    try {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
      
      const rect = e.currentTarget.getBoundingClientRect()
      
      // Check if it's a new component being added from the sidebar
      const componentType = e.dataTransfer.getData("component/type")
      if (componentType) {
        
        // Calculate position for new component (center it where dropped)
        const x = Math.max(0, e.clientX - rect.left - 50) // Offset for component center
        const y = Math.max(0, e.clientY - rect.top - 25)
        
        // Find the component definition and add it to canvas
        const componentDef = componentDefinitions.find(def => def.type === componentType)
        
        if (componentDef) {
          // Round the position values to avoid decimal positioning issues
          const roundedPosition = { x: Math.round(x), y: Math.round(y) }
          onAddToCanvas(componentDef, roundedPosition)
          toast.success(`${componentDef.name} added to canvas`)
        } else {
          toast.error('Component not found')
        }
        return
      }
      
      // Handle existing component being moved
      const instanceId = e.dataTransfer.getData("application/x-instance-id")
      if (instanceId) {
        const offsetX = parseFloat(e.dataTransfer.getData("application/x-offset-x") || "0")
        const offsetY = parseFloat(e.dataTransfer.getData("application/x-offset-y") || "0")
        
        // Calculate new position accounting for drag offset
        const x = Math.max(0, e.clientX - rect.left - offsetX)
        const y = Math.max(0, e.clientY - rect.top - offsetY)
        
        onUpdatePosition(instanceId, { x, y })
      }
    } catch (error) {
      console.error('Error in handleDrop:', error)
      toast.error('Failed to drop component')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    const hasComponentType = e.dataTransfer.types.includes("component/type")
    const hasInstanceId = e.dataTransfer.types.includes("application/x-instance-id")
    
    if (hasComponentType) {
      e.dataTransfer.dropEffect = "copy"
      setIsDragOver(true)
    } else if (hasInstanceId) {
      e.dataTransfer.dropEffect = "move"
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if leaving the canvas entirely
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false)
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only clear selection if clicking on the canvas itself, not on child elements
    if (e.target === e.currentTarget) {
      onSelectInstance(null)
    }
  }

  let content: React.ReactNode

  if (activeView === "documentation" && selectedComponent) {
    // Component preview mode 
    content = (
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
                <p className="text-base text-muted-foreground max-w-2xl">
                  {selectedComponent.description}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const position = {
                    x: 150 + (Math.random() * 200),
                    y: 100 + (Math.random() * 150),
                  }
                  onAddToCanvas(selectedComponent, position)
                }}
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
            <div className="container">
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
  } else {
    // Canvas mode
    content = (
      <div
        className={`flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden transition-all duration-200 ${
          isDragOver ? 'bg-primary/5 border-2 border-primary border-dashed' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleCanvasClick}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '20px 20px'
          }}
        />

        {/* Drop zone indicator */}
        {isDragOver && (
          <div className="absolute inset-4 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 flex items-center justify-center z-20">
            <div className="text-center text-primary">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium">Drop Component Here</p>
              <p className="text-sm opacity-75">Release to add to canvas</p>
            </div>
          </div>
        )}
        
        {/* Debug panel */}
        <div className="absolute top-4 left-4 bg-background/95 backdrop-blur border rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground z-50">
          <div>Components: {canvasComponents.length}</div>
          {canvasComponents.length > 0 && (
            <div className="mt-1 pt-1 border-t max-h-32 overflow-y-auto">
              {canvasComponents.slice(0, 5).map((comp, i) => (
                <div key={comp.id} className="text-xs">
                  {i + 1}. {comp.type} at ({Math.round(comp.position.x)}, {Math.round(comp.position.y)})
                </div>
              ))}
              {canvasComponents.length > 5 && <div className="text-xs">...and {canvasComponents.length - 5} more</div>}
            </div>
          )}
        </div>
        
        {!isClientMounted ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center animate-pulse">
                <AlertCircle className="w-8 h-8" />
              </div>
              <p className="text-lg mb-2">Loading Canvas...</p>
              <p className="text-sm">Initializing components</p>
            </div>
          </div>
        ) : canvasComponents.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center text-muted-foreground">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/80 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21"/>
                </svg>
              </div>
              <p className="text-xl mb-3 font-medium">{isDragOver ? "Drop Component Here" : "Canvas is Empty"}</p>
              <p className="text-sm max-w-md leading-relaxed">
                {isDragOver 
                  ? "Release to add the component to your canvas"
                  : "Drag components from the sidebar or click the + button to add them to your canvas"
                }
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
                <span>Drag & Drop Enabled</span>
                <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {canvasComponents.map((instance) => {
              return (
                <div
                  key={instance.id}
                  className="absolute cursor-move"
                  style={{
                    left: `${Math.max(0, instance.position.x)}px`,
                    top: `${Math.max(0, instance.position.y)}px`,
                    zIndex: selectedInstance?.id === instance.id ? 30 : 20,
                    transform: 'translate3d(0, 0, 0)',
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
              )
            })}
          </>
        )}

        {/* Canvas Controls - Bottom Right */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border rounded-lg px-4 py-2 shadow-lg z-40">
          <span className="text-sm text-muted-foreground">
            {canvasComponents.length} component{canvasComponents.length !== 1 ? "s" : ""}
          </span>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation()
              onClearCanvas()
            }} 
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

  return content
}

Canvas.displayName = "Canvas"
