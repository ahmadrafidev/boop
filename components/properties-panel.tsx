"use client"

import type { ComponentDefinition, ComponentInstance } from "@/app/page"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface PropertiesPanelProps {
  componentDef: ComponentDefinition | null
  instance: ComponentInstance | null
  onUpdateProps: (instanceId: string, newProps: Record<string, any>) => void
}

export function PropertiesPanel({ componentDef, instance, onUpdateProps }: PropertiesPanelProps) {
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

  const currentProps = instance?.props || componentDef.defaultProps
  const isInstance = Boolean(instance)

  const handlePropChange = (propName: string, value: any) => {
    if (instance) {
      onUpdateProps(instance.id, { [propName]: value })
    }
  }

  return (
    <div className="p-4 space-y-4">
      {/* Component Info */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">{componentDef.name}</CardTitle>
            <Badge variant={isInstance ? "default" : "secondary"} className="text-xs">
              {isInstance ? "Instance" : "Template"}
            </Badge>
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
        </div>

        <div className="space-y-4">
          {Object.entries(componentDef.propTypes).map(([propName, propConfig]) => {
            const currentValue = currentProps[propName]
            const isModified = currentValue !== componentDef.defaultProps[propName]

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
                    disabled={!isInstance}
                  />
                )}

                {propConfig.type === "select" && propConfig.options && (
                  <Select
                    value={currentValue || propConfig.options[0]}
                    onValueChange={(value) => handlePropChange(propName, value)}
                    disabled={!isInstance}
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
                        disabled={!isInstance}
                      />
                      <Label htmlFor={propName} className="text-sm">
                        {currentValue ? "Enabled" : "Disabled"}
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {!isInstance && (
          <div className="mt-6 p-3 bg-muted/50 rounded-lg border">
            <p className="text-xs text-muted-foreground">
              💡 Add this component to the canvas to edit its properties
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
