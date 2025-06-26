"use client"

import { useState, useEffect } from "react"
import { ComponentLibrary } from "@/components/component-library"
import { Canvas } from "@/components/canvas"
import { PropertiesPanel } from "@/components/properties-panel"
import { CodePanel } from "@/components/code-panel"
import { TopNavigation } from "@/components/top-navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export interface ComponentInstance {
  id: string
  type: string
  props: Record<string, any>
  position: { x: number; y: number }
}

export interface ComponentDefinition {
  type: string
  name: string
  icon: string
  description: string
  defaultProps: Record<string, any>
  propTypes: Record<string, { type: string; options?: string[] }>
}

const componentDefinitions: ComponentDefinition[] = [
  {
    type: "Button",
    name: "Button",
    icon: "Square",
    description: "Interact with the component and modify its props using the inspector",
    defaultProps: {
      children: "Button",
      variant: "default",
      size: "default",
    },
    propTypes: {
      children: { type: "string" },
      variant: {
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      },
      size: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
      },
    },
  },
  {
    type: "Card",
    name: "Card",
    icon: "CreditCard",
    description: "A flexible container for grouping and displaying content in a clear, concise format",
    defaultProps: {
      title: "Card Title",
      content: "Card content goes here",
      variant: "default",
    },
    propTypes: {
      title: { type: "string" },
      content: { type: "string" },
      variant: { type: "select", options: ["default", "outline"] },
    },
  },
  {
    type: "Badge",
    name: "Badge",
    icon: "Tag",
    description: "Small status descriptors for UI elements, perfect for labels and indicators",
    defaultProps: {
      children: "Badge",
      variant: "default",
    },
    propTypes: {
      children: { type: "string" },
      variant: {
        type: "select",
        options: ["default", "secondary", "destructive", "outline"],
      },
    },
  },
  {
    type: "Input",
    name: "Input",
    icon: "Type",
    description: "Text input field for collecting user data with various input types and states",
    defaultProps: {
      placeholder: "Enter text...",
      type: "text",
      disabled: false,
    },
    propTypes: {
      placeholder: { type: "string" },
      type: { type: "select", options: ["text", "email", "password", "number"] },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Alert",
    name: "Alert",
    icon: "AlertCircle",
    description: "Display important messages and notifications to users with different severity levels",
    defaultProps: {
      title: "Alert Title",
      description: "This is an alert description",
      variant: "default",
    },
    propTypes: {
      title: { type: "string" },
      description: { type: "string" },
      variant: { type: "select", options: ["default", "destructive"] },
    },
  },
]

export default function PrototypeDesignTool() {
  const [activeView, setActiveView] = useState<"component" | "canvas">("component")
  const [selectedComponent, setSelectedComponent] = useState<ComponentDefinition | null>(componentDefinitions[0])
  const [selectedInstance, setSelectedInstance] = useState<ComponentInstance | null>(null)
  const [canvasComponents, setCanvasComponents] = useState<ComponentInstance[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [previewProps, setPreviewProps] = useState<Record<string, any>>({})
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Initialize preview props when selected component changes
  useEffect(() => {
    if (selectedComponent) {
      setPreviewProps(selectedComponent.defaultProps)
    }
  }, [selectedComponent])

  const toggleCodePanel = () => {
    setIsCollapsed(!isCollapsed)
  }

  const addComponentToCanvas = (componentDef: ComponentDefinition, position?: { x: number; y: number }) => {
    const newInstance: ComponentInstance = {
      id: `${componentDef.type}-${Date.now()}`,
      type: componentDef.type,
      props: { ...componentDef.defaultProps },
      position: position || {
        x: Math.random() * 400 + 50,
        y: Math.random() * 300 + 50,
      },
    }
    setCanvasComponents((prev) => [...prev, newInstance])
    setSelectedInstance(newInstance)
    
    // Switch to canvas view when adding component
    if (activeView === "component") {
      setActiveView("canvas")
    }
  }

  const updateInstanceProps = (instanceId: string, newProps: Record<string, any>) => {
    setCanvasComponents((prev) =>
      prev.map((comp) => (comp.id === instanceId ? { ...comp, props: { ...comp.props, ...newProps } } : comp)),
    )
    if (selectedInstance?.id === instanceId) {
      setSelectedInstance((prev) => (prev ? { ...prev, props: { ...prev.props, ...newProps } } : null))
    }
  }

  const updatePreviewProps = (newProps: Record<string, any>) => {
    setPreviewProps(newProps)
  }

  const updateInstancePosition = (instanceId: string, position: { x: number; y: number }) => {
    setCanvasComponents((prev) => prev.map((comp) => (comp.id === instanceId ? { ...comp, position } : comp)))
    if (selectedInstance?.id === instanceId) {
      setSelectedInstance((prev) => (prev ? { ...prev, position } : null))
    }
  }

  const clearCanvas = () => {
    setCanvasComponents([])
    setSelectedInstance(null)
  }

  // Update preview props when component selection changes
  const handleComponentSelect = (component: ComponentDefinition | null) => {
    setSelectedComponent(component)
    if (component) {
      setPreviewProps(component.defaultProps)
    }
  }

  const currentComponentDef = selectedInstance
    ? componentDefinitions.find((def) => def.type === selectedInstance.type)
    : selectedComponent

  // Mobile sidebar component
  const SidebarContent = ({ type }: { type: "left" | "right" }) => (
    type === "left" ? (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium">Components</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search components"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <ComponentLibrary
          components={componentDefinitions}
          searchQuery={searchQuery}
          selectedComponent={selectedComponent}
          onSelectComponent={handleComponentSelect}
          onAddToCanvas={addComponentToCanvas}
        />
      </div>
    ) : (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background">
          <h3 className="text-sm font-medium">Properties</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <PropertiesPanel
            componentDef={currentComponentDef}
            instance={selectedInstance}
            onUpdateProps={updateInstanceProps}
            previewProps={previewProps}
            onPreviewPropsChange={updatePreviewProps}
          />
        </div>
      </div>
    )
  )

  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <div className="flex-1 bg-background overflow-hidden flex flex-col">
          <TopNavigation
            activeView={activeView}
            onViewChange={setActiveView}
            componentCount={canvasComponents.length}
            onClearCanvas={clearCanvas}
            selectedComponent={selectedComponent}
            leftPanelOpen={leftPanelOpen}
            rightPanelOpen={rightPanelOpen}
            onToggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
            onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
          />

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <Canvas
                activeView={activeView}
                selectedComponent={selectedComponent}
                selectedInstance={selectedInstance}
                canvasComponents={canvasComponents}
                componentDefinitions={componentDefinitions}
                onSelectInstance={setSelectedInstance}
                onUpdatePosition={updateInstancePosition}
                onClearCanvas={clearCanvas}
                onAddToCanvas={addComponentToCanvas}
                previewProps={previewProps}
              />
            </div>

            {activeView === "component" && (
              <div className={`flex-shrink-0 ${isCollapsed ? 'h-auto' : 'h-28'}`}>
                <CodePanel 
                  component={selectedComponent} 
                  instance={selectedInstance}
                  isCollapsed={isCollapsed}
                  onToggleCollapse={toggleCodePanel}
                  previewProps={previewProps}
                />
              </div>
            )}
          </div>

          {/* Mobile bottom sheet for panels */}
          <div className="border-t bg-background p-2 flex justify-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Components
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <SidebarContent type="left" />
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Properties
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0">
                <SidebarContent type="right" />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-background flex">
      {/* Left Sidebar */}
      {leftPanelOpen && (
        <div className="w-80 border-r bg-muted/30 flex flex-col">
          <div className="p-4 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium">Components</h3>
              <Button onClick={() => setLeftPanelOpen(false)} variant="ghost" size="sm" className="h-6 w-6 p-0">
                ×
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search components"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ComponentLibrary
            components={componentDefinitions}
            searchQuery={searchQuery}
            selectedComponent={selectedComponent}
            onSelectComponent={handleComponentSelect}
            onAddToCanvas={addComponentToCanvas}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation
          activeView={activeView}
          onViewChange={setActiveView}
          componentCount={canvasComponents.length}
          onClearCanvas={clearCanvas}
          selectedComponent={selectedComponent}
          leftPanelOpen={leftPanelOpen}
          rightPanelOpen={rightPanelOpen}
          onToggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
          onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
        />

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <Canvas
              activeView={activeView}
              selectedComponent={selectedComponent}
              selectedInstance={selectedInstance}
              canvasComponents={canvasComponents}
              componentDefinitions={componentDefinitions}
              onSelectInstance={setSelectedInstance}
              onUpdatePosition={updateInstancePosition}
              onClearCanvas={clearCanvas}
              onAddToCanvas={addComponentToCanvas}
              previewProps={previewProps}
            />
          </div>

          {/* Code Panel */}
          {activeView === "component" && (
            <div className={`flex-shrink-0 ${isCollapsed ? 'h-auto' : 'h-36'}`}>
              <CodePanel 
                component={selectedComponent} 
                instance={selectedInstance}
                isCollapsed={isCollapsed}
                onToggleCollapse={toggleCodePanel}
                previewProps={previewProps}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      {rightPanelOpen && (
        <div className="w-80 border-l bg-muted/30 flex flex-col">
          <div className="p-4 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Properties</h3>
              <Button onClick={() => setRightPanelOpen(false)} variant="ghost" size="sm" className="h-6 w-6 p-0">
                ×
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <PropertiesPanel
              componentDef={currentComponentDef}
              instance={selectedInstance}
              onUpdateProps={updateInstanceProps}
              previewProps={previewProps}
              onPreviewPropsChange={updatePreviewProps}
            />
          </div>
        </div>
      )}
    </div>
  )
}
