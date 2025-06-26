"use client"

import type { ComponentDefinition, ComponentInstance } from "@/app/page"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface PropertiesPanelProps {
  componentDef: ComponentDefinition | null
  instance: ComponentInstance | null
  onUpdateProps: (instanceId: string, newProps: Record<string, any>) => void
  previewProps?: Record<string, any>
  onPreviewPropsChange?: (newProps: Record<string, any>) => void
}

export function PropertiesPanel({ 
  componentDef, 
  instance, 
  onUpdateProps,
  previewProps,
  onPreviewPropsChange 
}: PropertiesPanelProps) {
  if (!componentDef) {
    return (
      <div className="p-4 flex items-center justify-center h-64">
        <div className="text-center text-muted-foreground">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
            <span className="text-lg">⚙️</span>
          </div>
          <p className="text-sm">Select a component</p>
          <p className="text-xs">Choose a component to edit its properties</p>
        </div>
      </div>
    )
  }

  const isInstance = Boolean(instance)
  const currentProps = instance?.props || previewProps || componentDef.defaultProps
  
  const handlePropChange = (propName: string, value: any) => {
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

  return (
    <div className="p-4 space-y-4">
      {/* Component Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">{componentDef.name}</CardTitle>
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
                  title="Reset to defaults"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {componentDef.description}
          </p>
        </CardHeader>
      </Card>

      {/* Properties */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Properties</h3>
          <Separator className="flex-1" />
          {hasModifiedProps && (
            <Badge variant="outline" className="text-xs">
              Modified
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          {Object.entries(componentDef.propTypes).map(([propName, propConfig]) => {
            const currentValue = currentProps[propName]
            const defaultValue = componentDef.defaultProps[propName]
            const isModified = currentValue !== defaultValue

            return (
              <div key={propName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={propName} className="text-sm font-medium flex items-center gap-2">
                    {propName}
                    {isModified && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                  </Label>
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {propConfig.type}
                  </Badge>
                </div>

                {propConfig.type === "string" && (
                  <Input
                    id={propName}
                    value={currentValue || ""}
                    onChange={(e) => handlePropChange(propName, e.target.value)}
                    placeholder={`Enter ${propName}...`}
                    className="text-sm"
                  />
                )}

                {propConfig.type === "select" && propConfig.options && (
                  <Select
                    value={currentValue || propConfig.options[0]}
                    onValueChange={(value) => handlePropChange(propName, value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {propConfig.options.map((option) => (
                        <SelectItem key={option} value={option} className="text-sm">
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {propConfig.type === "boolean" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={propName}
                        checked={currentValue || false}
                        onCheckedChange={(checked) => handlePropChange(propName, checked)}
                      />
                      <Label htmlFor={propName} className="text-sm">
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
                      onClick={() => handlePropChange(propName, defaultValue)}
                      className="h-auto p-1 text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {!isInstance && (
          <div className="mt-6 p-3 bg-muted/50 rounded-lg border">
            <p className="text-xs text-muted-foreground">
              💡 You're editing the preview. Add this component to the canvas to create a persistent instance.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
