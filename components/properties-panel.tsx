"use client"

import type { ComponentDefinition, ComponentInstance, ComponentProps } from "@/app/page"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RotateCcw, Info } from "lucide-react"
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
      <div className="p-4 flex items-center justify-center h-64" role="region" aria-label="Properties panel">
        <div className="text-center text-muted-foreground">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg" role="img" aria-label="Settings">⚙️</span>
          </div>
          <p className="text-sm">Select a component</p>
          <p className="text-xs">Choose a component to edit its properties</p>
        </div>
      </div>
    )
  }

  const isInstance = Boolean(instance)
  const currentProps = instance?.props || previewProps || componentDef.defaultProps
  
  const handlePropChange = (propName: string, value: string | number | boolean) => {
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

  const renderPropEditor = (propName: string, propConfig: any, currentValue: any, defaultValue: any, isModified: boolean) => {
    const inputId = `prop-${propName}`
    
    return (
      <div key={propName} className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={inputId} className="text-sm font-medium flex items-center gap-2">
            {propName}
            {isModified && <div className="w-1.5 h-1.5 bg-primary rounded-full" aria-hidden="true" />}
          </Label>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs px-1.5 py-0.5">
              {propConfig.type}
            </Badge>
            {propConfig.description && (
              <div 
                className="w-4 h-4 text-muted-foreground cursor-help"
                title={propConfig.description}
                role="img"
                aria-label="Property description"
              >
                <Info className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>

        {propConfig.description && (
          <p className="text-xs text-muted-foreground leading-relaxed" id={`${inputId}-description`}>
            {propConfig.description}
          </p>
        )}

        {propConfig.type === "string" && (
          currentValue && currentValue.length > 50 ? (
            <Textarea
              id={inputId}
              value={String(currentValue || "")}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              placeholder={`Enter ${propName}...`}
              className="text-sm min-h-20"
              aria-describedby={propConfig.description ? `${inputId}-description` : undefined}
            />
          ) : (
            <Input
              id={inputId}
              value={String(currentValue || "")}
              onChange={(e) => handlePropChange(propName, e.target.value)}
              placeholder={`Enter ${propName}...`}
              className="text-sm"
              aria-describedby={propConfig.description ? `${inputId}-description` : undefined}
            />
          )
        )}

        {propConfig.type === "select" && propConfig.options && (
          <Select
            value={String(currentValue || "__not_set__")}
            onValueChange={(value) => handlePropChange(propName, value === "__not_set__" ? undefined : value)}
          >
            <SelectTrigger className="text-sm" aria-describedby={propConfig.description ? `${inputId}-description` : undefined}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__not_set__" className="text-sm italic text-muted-foreground">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id={inputId}
                checked={Boolean(currentValue || false)}
                onCheckedChange={(checked) => handlePropChange(propName, checked)}
                aria-describedby={propConfig.description ? `${inputId}-description` : undefined}
              />
              <Label htmlFor={inputId} className="text-sm">
                {currentValue ? "Enabled" : "Disabled"}
              </Label>
            </div>
          </div>
        )}

        {isModified && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Default: {String(defaultValue)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePropChange(propName, defaultValue ?? "")}
              className="h-auto p-1 text-xs"
              aria-label={`Reset ${propName} to default value`}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4" role="region" aria-label="Component properties editor">
      {/* Component Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm" id="component-title">{componentDef.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isInstance ? "default" : "secondary"} className="text-xs">
                {isInstance ? "Instance" : "Preview"}
              </Badge>
              {hasModifiedProps && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetProps}
                  className="h-6 w-6 p-0"
                  aria-label="Reset all properties to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed" id="component-description">
            {componentDef.description}
          </p>
        </CardHeader>
      </Card>

      {/* Tabbed Properties */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="properties" className="relative">
            Properties
            {hasModifiedProps && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
            )}
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="relative">
            Accessibility
            {hasModifiedA11yProps && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4 mt-4">
          <div className="space-y-4">
            {Object.entries(componentDef.propTypes).map(([propName, propConfig]) => {
              const currentValue = currentProps[propName]
              const defaultValue = componentDef.defaultProps[propName]
              const isModified = currentValue !== defaultValue

              return renderPropEditor(propName, propConfig, currentValue, defaultValue, isModified)
            })}

            {Object.keys(componentDef.propTypes).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-lg" role="img" aria-label="No properties">📝</span>
                </div>
                <p className="text-sm">No properties defined</p>
                <p className="text-xs">This component has no configurable properties</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4 mt-4">
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg border">
            <p className="mb-2 font-medium">WAI-ARIA Properties</p>
            <p>These properties improve accessibility for users with assistive technologies. Only set values that are appropriate for your component&apos;s purpose and context.</p>
          </div>

          {/* Common A11y Properties */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-b pb-2">
              Common
            </h4>
            {Object.entries(commonA11yProps).map(([propName, propConfig]) => {
              const currentValue = currentProps[propName]
              const isModified = currentValue !== undefined && currentValue !== ""

              return renderPropEditor(propName, propConfig, currentValue, "", isModified)
            })}
          </div>

          {/* Interactive A11y Properties */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-b pb-2">
              Interactive Elements
            </h4>
            {Object.entries(interactiveA11yProps).map(([propName, propConfig]) => {
              const currentValue = currentProps[propName]
              const isModified = currentValue !== undefined && currentValue !== ""

              return renderPropEditor(propName, propConfig, currentValue, "", isModified)
            })}
          </div>

          {/* Form A11y Properties */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-b pb-2">
              Form Controls
            </h4>
            {Object.entries(formA11yProps).map(([propName, propConfig]) => {
              const currentValue = currentProps[propName]
              const isModified = currentValue !== undefined && currentValue !== ""

              return renderPropEditor(propName, propConfig, currentValue, "", isModified)
            })}
          </div>

          {/* Live Region A11y Properties */}
          <div className="space-y-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide border-b pb-2">
              Live Regions
            </h4>
            {Object.entries(liveRegionA11yProps).map(([propName, propConfig]) => {
              const currentValue = currentProps[propName]
              const isModified = currentValue !== undefined && currentValue !== ""

              return renderPropEditor(propName, propConfig, currentValue, "", isModified)
            })}
          </div>
        </TabsContent>
      </Tabs>

      {!isInstance && (
        <div className="mt-6 p-3 bg-muted/50 rounded-lg border" role="note">
          <p className="text-xs text-muted-foreground">
            💡 You&apos;re editing the preview. Add this component to the canvas to create a persistent instance.
          </p>
        </div>
      )}
    </div>
  )
}
