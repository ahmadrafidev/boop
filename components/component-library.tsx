"use client"

import { Button } from "@/components/ui/button"
import type { ComponentDefinition } from "@/app/page"
import { Plus, Square, CreditCard, Tag, Type, AlertCircle, MousePointer, FileText, CheckSquare, ToggleLeft, BarChart3, Minus, User, TextCursorInput } from "lucide-react"
import { toast } from "sonner"

interface ComponentLibraryProps {
  components: ComponentDefinition[]
  searchQuery: string
  selectedComponent: ComponentDefinition | null
  onSelectComponent: (component: ComponentDefinition) => void
  onAddToCanvas: (component: ComponentDefinition, position?: { x: number; y: number }) => void
}

const iconMap = {
  Square,
  CreditCard,
  Tag,
  Type,
  AlertCircle,
  MousePointer,
  FileText,
  CheckSquare,
  ToggleLeft,
  BarChart3,
  Minus,
  User,
  TextCursorInput,
}

export function ComponentLibrary({
  components,
  searchQuery,
  selectedComponent,
  onSelectComponent,
  onAddToCanvas,
}: ComponentLibraryProps) {
  const filteredComponents = components.filter((comp) => 
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddToCanvas = (component: ComponentDefinition, e: React.MouseEvent) => {
    e.stopPropagation()
    const position = {
      x: 150 + (Math.random() * 200),
      y: 100 + (Math.random() * 150),
    }
    onAddToCanvas(component, position)
    toast.success(`${component.name} added to canvas`)
  }

  if (filteredComponents.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">No components found</p>
          <p className="text-xs">Try a different search term</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-1">Components</h3>
            <p className="text-xs text-muted-foreground">
              {filteredComponents.length} of {components.length} components
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredComponents.map((component) => {
              const IconComponent = iconMap[component.icon as keyof typeof iconMap] || Square
              const isSelected = selectedComponent?.type === component.type

              return (
                <div key={component.type} className="relative group">
                  <Button
                    variant={isSelected ? "secondary" : "outline"}
                    className={`w-full h-20 flex flex-col items-center justify-center gap-2 p-3 transition-all hover:shadow-sm ${
                      isSelected ? "ring-2 ring-primary ring-offset-1" : ""
                    }`}
                    onClick={() => onSelectComponent(component)}
                    aria-label={`Select ${component.name} component`}
                    title={component.description}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("component/type", component.type)
                      e.dataTransfer.effectAllowed = "copy"
                      
                      const target = e.target as HTMLElement
                      target.style.opacity = "0.5"
                    }}
                    onDragEnd={(e) => {
                      const target = e.target as HTMLElement
                      target.style.opacity = "1"
                    }}
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-xs font-medium truncate w-full text-center">{component.name}</span>
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    className="absolute -top-1 -right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md"
                    onClick={(e) => handleAddToCanvas(component, e)}
                    aria-label={`Add ${component.name} to canvas`}
                    title={`Add ${component.name} to canvas`}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {selectedComponent && (
        <div className="border-t bg-background p-4">
          <div className="p-3 bg-muted/50 rounded-lg border">
            <h4 className="text-sm font-medium mb-1">{selectedComponent.name}</h4>
            <p className="text-xs text-muted-foreground mb-3">{selectedComponent.description}</p>
            <Button 
              size="sm" 
              onClick={(e) => handleAddToCanvas(selectedComponent, e)}
              className="w-full"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add to Canvas
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
