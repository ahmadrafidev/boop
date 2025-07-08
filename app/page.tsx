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

export type ComponentProps = Record<string, string | number | boolean | undefined>

export interface ComponentInstance {
  id: string
  type: string
  props: ComponentProps
  position: { x: number; y: number }
}

export type PropType = {
  type: "string" | "boolean" | "select"
  options?: string[]
}

export interface ComponentDefinition {
  type: string
  name: string
  icon: string
  description: string
  defaultProps: ComponentProps
  propTypes: Record<string, PropType>
}

const componentDefinitions: ComponentDefinition[] = [
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
  {
    type: "Avatar",
    name: "Avatar",
    icon: "User",
    description: "A circular component for displaying user profile images with fallback support for initials when no image is available",
    defaultProps: {
      src: "",
      fallback: "JD",
      size: "default",
    },
    propTypes: {
      src: { type: "string" },
      fallback: { type: "string" },
      size: { type: "select", options: ["sm", "default", "lg"] },
    },
  },
  {
    type: "Badge",
    name: "Badge",
    icon: "Tag",
    description: "A compact component for displaying status, labels, or counts with various visual styles",
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
    type: "Button",
    name: "Button",
    icon: "MousePointer",
    description: "A versatile clickable component with multiple variants and sizes for triggering actions or navigation",
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
    description: "A container component for organizing related content with optional header, footer, and content sections",
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
    type: "Checkbox",
    name: "Checkbox",
    icon: "CheckSquare",
    description: "An interactive form control for binary choices or multiple selections with support for indeterminate state",
    defaultProps: {
      label: "Checkbox",
      checked: false,
      disabled: false,
    },
    propTypes: {
      label: { type: "string" },
      checked: { type: "boolean" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Combobox",
    name: "Combobox",
    icon: "ChevronDown",
    description: "Searchable dropdown for selecting from a list of options",
    defaultProps: {
      label: "Select Option",
      placeholder: "Select an option...",
      disabled: false,
    },
    propTypes: {
      label: { type: "string" },
      placeholder: { type: "string" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Menu",
    name: "Menu",
    icon: "MoreVertical",
    description: "A contextual menu component that displays a list of actions or options when triggered",
    defaultProps: {
      children: "Menu",
      disabled: false,
    },
    propTypes: {
      children: { type: "string" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Modal",
    name: "Modal",
    icon: "Square",
    description: "A dialog component that creates a focused overlay window for important content or user interactions",
    defaultProps: {
      children: "Open Modal",
      title: "Modal Title",
      content: "Modal content goes here.",
      disabled: false,
    },
    propTypes: {
      children: { type: "string" },
      title: { type: "string" },
      content: { type: "string" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Progress",
    name: "Progress",
    icon: "BarChart",
    description: "A visual indicator for displaying the progress or completion status of an operation with optional label",
    defaultProps: {
      value: 50,
      max: 100,
      showLabel: true,
    },
    propTypes: {
      value: { type: "string" },
      max: { type: "string" },
      showLabel: { type: "boolean" },
    },
  },
  {
    type: "RadioButton",
    name: "Radio Group",
    icon: "Circle",
    description: "A form control for selecting a single option from a list of mutually exclusive choices",
    defaultProps: {
      label: "Choose Option",
      defaultValue: "Option 1",
      disabled: false,
    },
    propTypes: {
      label: { type: "string" },
      defaultValue: { type: "string" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Slider",
    name: "Slider",
    icon: "Sliders",
    description: "An interactive component for selecting a numeric value within a specified range with optional step intervals",
    defaultProps: {
      label: "Value",
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      showValue: true,
      disabled: false,
    },
    propTypes: {
      label: { type: "string" },
      value: { type: "string" },
      min: { type: "string" },
      max: { type: "string" },
      step: { type: "string" },
      showValue: { type: "boolean" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Switch",
    name: "Switch",
    icon: "ToggleLeft",
    description: "A toggle component for switching between two states with a sliding animation effect",
    defaultProps: {
      label: "Switch",
      checked: false,
      disabled: false,
    },
    propTypes: {
      label: { type: "string" },
      checked: { type: "boolean" },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Tabs",
    name: "Tabs",
    icon: "Folder",
    description: "A navigation component for organizing and switching between related sections of content",
    defaultProps: {
      defaultTab: "Tab 1",
    },
    propTypes: {
      defaultTab: { type: "string" },
    },
  },
  {
    type: "Text",
    name: "Text",
    icon: "FileText",
    description: "A typography component for displaying text content with various sizes, weights, and styles",
    defaultProps: {
      children: "Sample text",
      size: "default",
      variant: "default",
    },
    propTypes: {
      children: { type: "string" },
      size: { type: "select", options: ["sm", "default", "lg", "xl"] },
      variant: { type: "select", options: ["default", "muted", "destructive"] },
    },
  },
  {
    type: "TextInput",
    name: "Text Input",
    icon: "Edit3",
    description: "A form control for collecting single-line text input with support for various input types and validation",
    defaultProps: {
      label: "Label",
      placeholder: "Enter text...",
      type: "text",
      disabled: false,
    },
    propTypes: {
      label: { type: "string" },
      placeholder: { type: "string" },
      type: { type: "select", options: ["text", "email", "password", "number"] },
      disabled: { type: "boolean" },
    },
  },
  {
    type: "Tooltip",
    name: "Tooltip",
    icon: "HelpCircle",
    description: "A floating component that provides additional information or context when hovering over an element",
    defaultProps: {
      children: "Hover me",
      content: "Tooltip content",
      disabled: false,
    },
    propTypes: {
      children: { type: "string" },
      content: { type: "string" },
      disabled: { type: "boolean" },
    },
  },
]

export default function PrototypeDesignTool() {
  const [activeView, setActiveView] = useState<"documentation" | "canvas">("documentation")
  const [selectedComponent, setSelectedComponent] = useState<ComponentDefinition | null>(componentDefinitions[0])
  const [selectedInstance, setSelectedInstance] = useState<ComponentInstance | null>(null)
  const [canvasComponents, setCanvasComponents] = useState<ComponentInstance[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [leftPanelOpen, setLeftPanelOpen] = useState(true)
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [previewProps, setPreviewProps] = useState<ComponentProps>({})
  const [isHydrated, setIsHydrated] = useState(false)
  const isMobile = useIsMobile()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if (selectedComponent) {
      setPreviewProps(selectedComponent.defaultProps)
    }
  }, [selectedComponent])

  useEffect(() => {
    const savedLeftPanel = localStorage.getItem('leftPanelOpen')
    const savedRightPanel = localStorage.getItem('rightPanelOpen')
    const savedActiveView = localStorage.getItem('activeView')
    const savedCanvasComponents = localStorage.getItem('canvasComponents')
    
    setLeftPanelOpen(savedLeftPanel !== null ? JSON.parse(savedLeftPanel) : true)
    setRightPanelOpen(savedRightPanel !== null ? JSON.parse(savedRightPanel) : true)
    setActiveView(savedActiveView !== null ? JSON.parse(savedActiveView) : "documentation")
    
    if (savedCanvasComponents) {
      try {
        const parsedComponents = JSON.parse(savedCanvasComponents)

        setCanvasComponents(parsedComponents)
      } catch (error) {
        console.error('Error parsing saved canvas components:', error)
      }
    }
    
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('leftPanelOpen', JSON.stringify(leftPanelOpen))
    }
  }, [leftPanelOpen, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('rightPanelOpen', JSON.stringify(rightPanelOpen))
    }
  }, [rightPanelOpen, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('activeView', JSON.stringify(activeView))
    }
  }, [activeView, isHydrated])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('canvasComponents', JSON.stringify(canvasComponents))
    }
  }, [canvasComponents, isHydrated])

  if (!isHydrated) {
    return <div className="h-screen bg-background" />
  }

  const toggleCodePanel = () => {
    setIsCollapsed(!isCollapsed)
  }

  const addComponentToCanvas = (componentDef: ComponentDefinition, position?: { x: number; y: number }) => {
    const newInstance: ComponentInstance = {
      id: `${componentDef.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: componentDef.type,
      props: { ...componentDef.defaultProps },
      position: position || {
        x: Math.random() * 300 + 100, // More centered positioning
        y: Math.random() * 200 + 100,
      },
    }
    
    setCanvasComponents((prev) => [...prev, newInstance])
    setSelectedInstance(newInstance)
    
    // Always switch to canvas view when adding components
    setActiveView("canvas")
  }

  const updateInstanceProps = (instanceId: string, newProps: ComponentProps) => {
    setCanvasComponents((prev) =>
      prev.map((comp) => (comp.id === instanceId ? { ...comp, props: { ...comp.props, ...newProps } } : comp)),
    )
    if (selectedInstance?.id === instanceId) {
      setSelectedInstance((prev) => (prev ? { ...prev, props: { ...prev.props, ...newProps } } : null))
    }
  }

  const updatePreviewProps = (newProps: ComponentProps) => {
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

  const handleComponentSelect = (component: ComponentDefinition | null) => {
    setSelectedComponent(component)
    if (component) {
      setPreviewProps(component.defaultProps)
    }
  }

  const currentComponentDef = selectedInstance
    ? componentDefinitions.find((def) => def.type === selectedInstance.type) || null
    : selectedComponent

  // Mobile sidebar component
  const SidebarContent = ({ type }: { type: "left" | "right" }) => (
    type === "left" ? (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto min-h-0">
          <ComponentLibrary
            components={componentDefinitions}
            searchQuery={searchQuery}
            selectedComponent={selectedComponent}
            onSelectComponent={handleComponentSelect}
            onAddToCanvas={addComponentToCanvas}
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background flex-shrink-0">
          <h3 className="text-sm font-medium">Inspector</h3>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
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

            {activeView === "documentation" && (
              <div className="flex-shrink-0">
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
        <div className="w-80 border-r bg-muted/30 flex flex-col h-screen">
          <div className="p-4 border-b bg-background/95 backdrop-blur flex-shrink-0">
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

          <div className="flex-1 overflow-y-auto min-h-0">
            <ComponentLibrary
              components={componentDefinitions}
              searchQuery={searchQuery}
              selectedComponent={selectedComponent}
              onSelectComponent={handleComponentSelect}
              onAddToCanvas={addComponentToCanvas}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavigation
          activeView={activeView}
          onViewChange={setActiveView}
          selectedComponent={selectedComponent}
          leftPanelOpen={leftPanelOpen}
          rightPanelOpen={rightPanelOpen}
          onToggleLeftPanel={() => setLeftPanelOpen(!leftPanelOpen)}
          onToggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)}
        />

          <div className="flex-1 flex flex-col min-h-0">
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

          {/* Code Panel */}
          {activeView === "documentation" && (
            <div className="flex-shrink-0">
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
        <div className="w-80 border-l bg-muted/30 flex flex-col h-screen">
          <div className="p-4 border-b bg-background/95 backdrop-blur flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold">Inspector</h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
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

PrototypeDesignTool.displayName = "PrototypeDesignTool"
