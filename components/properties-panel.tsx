"use client"

import type { ComponentDefinition, ComponentInstance, ComponentProps } from "@/app/page"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RotateCcw, Info, Zap } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface PropertiesPanelProps {
  componentDef: ComponentDefinition | null
  instance: ComponentInstance | null
  onUpdateProps: (instanceId: string, newProps: ComponentProps) => void
  previewProps?: ComponentProps
  onPreviewPropsChange?: (newProps: ComponentProps) => void
}

// Common accessibility properties that apply to most components
const commonA11yProps = {
  "aria-label": {
    type: "string" as const,
    description: "Provides an accessible name for the element when visible text is not sufficient"
  },
  "aria-labelledby": {
    type: "string" as const,
    description: "References other elements that describe this element (space-separated IDs)"
  },
  "aria-describedby": {
    type: "string" as const,
    description: "References elements that provide additional description (space-separated IDs)"
  },
  "aria-hidden": {
    type: "boolean" as const,
    description: "Hides decorative elements from assistive technologies"
  },
  "role": {
    type: "select" as const,
    options: [
      "", "button", "link", "heading", "banner", "navigation", "main", "complementary", 
      "contentinfo", "region", "article", "section", "aside", "dialog", "alertdialog",
      "alert", "status", "log", "marquee", "timer", "tablist", "tab", "tabpanel",
      "listbox", "option", "combobox", "menu", "menuitem", "menubar", "tree", 
      "treeitem", "grid", "gridcell", "row", "columnheader", "rowheader", "group",
      "radiogroup", "radio", "checkbox", "slider", "spinbutton", "progressbar",
      "tooltip", "presentation", "none"
    ],
    description: "Defines what an element is or does for assistive technologies"
  },
  "tabindex": {
    type: "string" as const,
    description: "Controls keyboard navigation (0 = natural order, -1 = not focusable, positive = explicit order)"
  }
}

// Interactive-specific accessibility properties
const interactiveA11yProps = {
  "aria-expanded": {
    type: "boolean" as const,
    description: "Indicates if a collapsible element is expanded"
  },
  "aria-selected": {
    type: "boolean" as const,
    description: "Indicates if a selectable element is currently selected"
  },
  "aria-checked": {
    type: "select" as const,
    options: ["", "true", "false", "mixed"],
    description: "Indicates the checked state of checkboxes, radio buttons, or other widgets"
  },
  "aria-disabled": {
    type: "boolean" as const,
    description: "Indicates that the element is perceivable but disabled"
  },
  "aria-pressed": {
    type: "select" as const,
    options: ["", "true", "false", "mixed"],
    description: "Indicates the current pressed state of toggle buttons"
  },
  "aria-current": {
    type: "select" as const,
    options: ["", "page", "step", "location", "date", "time", "true", "false"],
    description: "Indicates the current item within a container or set"
  }
}

// Form-specific accessibility properties
const formA11yProps = {
  "aria-required": {
    type: "boolean" as const,
    description: "Indicates that user input is required on the element"
  },
  "aria-invalid": {
    type: "select" as const,
    options: ["", "true", "false", "grammar", "spelling"],
    description: "Indicates the entered value does not conform to the expected format"
  },
  "aria-errormessage": {
    type: "string" as const,
    description: "References the element that provides error message for this field"
  },
  "aria-autocomplete": {
    type: "select" as const,
    options: ["", "none", "inline", "list", "both"],
    description: "Indicates whether inputting text triggers autocomplete behavior"
  }
}

// Live region accessibility properties
const liveRegionA11yProps = {
  "aria-live": {
    type: "select" as const,
    options: ["", "off", "polite", "assertive"],
    description: "Indicates that content may be updated and describes the types of updates"
  },
  "aria-atomic": {
    type: "boolean" as const,
    description: "Indicates whether assistive technologies should present all or part of the changed region"
  },
  "aria-relevant": {
    type: "string" as const,
    description: "Describes what changes to a live region are relevant (additions, removals, text, all)"
  }
}

export function PropertiesPanel({ 
  componentDef, 
  instance, 
  onUpdateProps,
  previewProps,
  onPreviewPropsChange 
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState("properties")

  if (!componentDef) {
    return (
      <div className="h-full flex items-center justify-center" role="region" aria-label="Properties panel">
        <div className="text-center text-muted-foreground/50">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/20 flex items-center justify-center">
            <Zap className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <p className="text-sm font-medium mb-1">No component selected</p>
          <p className="text-xs text-muted-foreground/60">Select a component to inspect its properties</p>
        </div>
      </div>
    )
  }

  const isInstance = Boolean(instance)
  const currentProps = instance?.props || previewProps || componentDef.defaultProps
  
  const handlePropChange = (propName: string, value: string | number | boolean | undefined) => {
    if (instance) {
      // Canvas mode - update actual instance
      onUpdateProps(instance.id, { [propName]: value })
    } else {
      // Preview mode - update preview props
      const newProps = { ...currentProps, [propName]: value }
      onPreviewPropsChange?.(newProps)
    }
  }

  const handleResetProps = () => {
    if (instance) {
      onUpdateProps(instance.id, componentDef.defaultProps)
    } else {
      onPreviewPropsChange?.(componentDef.defaultProps)
    }
  }

  const hasModifiedProps = Object.keys(componentDef.propTypes).some(
    propName => currentProps[propName] !== componentDef.defaultProps[propName]
  )

  // Combine all a11y properties
  const allA11yProps = {
    ...commonA11yProps,
    ...interactiveA11yProps,
    ...formA11yProps,
    ...liveRegionA11yProps
  }

  const hasModifiedA11yProps = Object.keys(allA11yProps).some(
    propName => currentProps[propName] !== undefined && currentProps[propName] !== ""
  )

  const renderPropEditor = (
    propName: string, 
    propConfig: { type: string; options?: string[]; description?: string }, 
    currentValue: string | number | boolean | undefined, 
    defaultValue: string | number | boolean | undefined, 
    isModified: boolean
  ) => {
    const inputId = `prop-${propName}`
    
    return (
      <div key={propName} className="group relative">
        {/* Property Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Label htmlFor={inputId} className="text-sm font-medium text-foreground flex items-center gap-2 truncate">
                {propName}
                {isModified && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" aria-hidden="true" />}
              </Label>
              <Badge variant="outline" className="text-xs h-5 px-2 font-mono bg-background border-muted/40 text-muted-foreground/80 flex-shrink-0">
                {propConfig.type}
              </Badge>
            </div>
            {propConfig.description && (
              <p className="text-xs text-muted-foreground/60 leading-relaxed pr-6" id={`${inputId}-description`}>
                {propConfig.description}
              </p>
            )}
          </div>
          {propConfig.description && (
            <div 
              className="w-4 h-4 text-muted-foreground/40 hover:text-muted-foreground/80 cursor-help transition-colors mt-0.5 flex-shrink-0"
              title={propConfig.description}
              role="img"
              aria-label="Property description"
            >
              <Info className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Property Input */}
        <div className="space-y-3">
          {propConfig.type === "string" && (
            currentValue && typeof currentValue === "string" && currentValue.length > 50 ? (
              <Textarea
                id={inputId}
                value={String(currentValue || "")}
                onChange={(e) => handlePropChange(propName, e.target.value)}
                placeholder={`Enter ${propName}...`}
                className="text-sm min-h-20 resize-none border-0 bg-muted/30 focus:bg-background focus:ring-1 focus:ring-ring rounded-lg transition-all"
                aria-describedby={propConfig.description ? `${inputId}-description` : undefined}
              />
            ) : (
              <Input
                id={inputId}
                value={String(currentValue || "")}
                onChange={(e) => handlePropChange(propName, e.target.value)}
                placeholder={`Enter ${propName}...`}
                className="text-sm border-0 bg-muted/30 focus:bg-background focus:ring-1 focus:ring-ring rounded-lg transition-all"
                aria-describedby={propConfig.description ? `${inputId}-description` : undefined}
              />
            )
          )}

          {propConfig.type === "select" && propConfig.options && (
            <Select
              value={String(currentValue || "__not_set__")}
              onValueChange={(value) => handlePropChange(propName, value === "__not_set__" ? undefined : value)}
            >
              <SelectTrigger className="text-sm border-0 bg-muted/30 focus:bg-background focus:ring-1 focus:ring-ring rounded-lg transition-all" aria-describedby={propConfig.description ? `${inputId}-description` : undefined}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__not_set__" className="text-sm text-muted-foreground/60 italic">
                  Not set
                </SelectItem>
                {propConfig.options.map((option: string) => (
                  <SelectItem key={option} value={option || "__empty__"} className="text-sm">
                    {option || "(empty)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {propConfig.type === "boolean" && (
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Switch
                  id={inputId}
                  checked={Boolean(currentValue || false)}
                  onCheckedChange={(checked) => handlePropChange(propName, checked)}
                  aria-describedby={propConfig.description ? `${inputId}-description` : undefined}
                />
                <Label htmlFor={inputId} className="text-sm font-medium">
                  {currentValue ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>
          )}

          {/* Reset/Default Display */}
          {isModified && (
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-muted-foreground/50">
                Default: <code className="px-1.5 py-0.5 bg-muted/50 rounded text-xs">{String(defaultValue)}</code>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePropChange(propName, defaultValue ?? "")}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                aria-label={`Reset ${propName} to default value`}
              >
                Reset
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background" role="region" aria-label="Component properties editor">
      {/* Component Header */}
      <div className="px-6 py-5 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground truncate" id="component-title">
              {componentDef.name}
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge 
              variant={isInstance ? "default" : "secondary"} 
              className="text-xs h-6 px-2.5 font-medium"
            >
              {isInstance ? "Instance" : "Preview"}
            </Badge>
            {(hasModifiedProps || hasModifiedA11yProps) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetProps}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground rounded-md"
                aria-label="Reset all properties to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground/70 leading-relaxed" id="component-description">
          {componentDef.description}
        </p>
      </div>

      {/* Tabbed Properties */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-6 pt-4 pb-2">
            <TabsList className="grid w-full grid-cols-2 h-10 bg-muted/40 p-1 rounded-lg">
              <TabsTrigger 
                value="properties" 
                className="relative text-sm font-medium h-8 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
              >
                Properties
                {hasModifiedProps && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" aria-hidden="true" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="accessibility" 
                className="relative text-sm font-medium h-8 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all"
              >
                Accessibility
                {hasModifiedA11yProps && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" aria-hidden="true" />
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="properties" className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 px-6 pb-6 space-y-6 overflow-y-auto">
              {Object.entries(componentDef.propTypes).map(([propName, propConfig]) => {
                const currentValue = currentProps[propName]
                const defaultValue = componentDef.defaultProps[propName]
                const isModified = currentValue !== defaultValue

                return renderPropEditor(propName, propConfig, currentValue, defaultValue, isModified)
              })}

              {Object.keys(componentDef.propTypes).length === 0 && (
                <div className="text-center py-16 text-muted-foreground/50">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/20 flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-sm font-medium mb-1">No properties defined</p>
                  <p className="text-xs text-muted-foreground/60">This component has no configurable properties</p>
                </div>
              )}
            </div>

            {/* Preview Mode Footer - Only on Properties Tab */}
            {!isInstance && (
              <div className="px-6 py-4 border-t border-border/50 bg-muted/20" role="note">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">💡</span>
                  </div>
                  <p className="text-xs text-muted-foreground/70">
                    Preview mode — Add this component to the canvas to create a persistent instance
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="accessibility" className="flex-1 px-6 pb-6 space-y-8 overflow-y-auto">
            {/* A11y Info Banner */}
            <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Info className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                    WAI-ARIA Properties
                  </p>
                  <p className="text-xs text-blue-700/80 dark:text-blue-200/80 leading-relaxed">
                    Enhance accessibility for users with assistive technologies. Only set values that are appropriate for your component's purpose and context.
                  </p>
                </div>
              </div>
            </div>

            {/* Common A11y Properties */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground/90 mb-4 pb-2 border-b border-border/30">
                  Common
                </h3>
                <div className="space-y-6">
                  {Object.entries(commonA11yProps).map(([propName, propConfig]) => {
                    const currentValue = currentProps[propName]
                    const isModified = currentValue !== undefined && currentValue !== ""

                    return renderPropEditor(propName, propConfig, currentValue, "", isModified)
                  })}
                </div>
              </div>

              {/* Interactive A11y Properties */}
              <div>
                <h3 className="text-sm font-semibold text-foreground/90 mb-4 pb-2 border-b border-border/30">
                  Interactive Elements
                </h3>
                <div className="space-y-6">
                  {Object.entries(interactiveA11yProps).map(([propName, propConfig]) => {
                    const currentValue = currentProps[propName]
                    const isModified = currentValue !== undefined && currentValue !== ""

                    return renderPropEditor(propName, propConfig, currentValue, "", isModified)
                  })}
                </div>
              </div>

              {/* Form A11y Properties */}
              <div>
                <h3 className="text-sm font-semibold text-foreground/90 mb-4 pb-2 border-b border-border/30">
                  Form Controls
                </h3>
                <div className="space-y-6">
                  {Object.entries(formA11yProps).map(([propName, propConfig]) => {
                    const currentValue = currentProps[propName]
                    const isModified = currentValue !== undefined && currentValue !== ""

                    return renderPropEditor(propName, propConfig, currentValue, "", isModified)
                  })}
                </div>
              </div>

              {/* Live Region A11y Properties */}
              <div>
                <h3 className="text-sm font-semibold text-foreground/90 mb-4 pb-2 border-b border-border/30">
                  Live Regions
                </h3>
                <div className="space-y-6">
                  {Object.entries(liveRegionA11yProps).map(([propName, propConfig]) => {
                    const currentValue = currentProps[propName]
                    const isModified = currentValue !== undefined && currentValue !== ""

                    return renderPropEditor(propName, propConfig, currentValue, "", isModified)
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
