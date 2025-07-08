"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { radioButtonConfig } from './config'

export function RadioButtonPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || radioButtonConfig.definition.defaultProps
  
  const handlePropChange = (propName: string, value: string | number | boolean | undefined) => {
    if (instance) {
      onUpdateProps(instance.id, { ...instance.props, [propName]: value })
    } else {
      const newProps = { ...currentProps, [propName]: value }
      onPreviewPropsChange?.(newProps)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Radio Group Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="radio-label" className="text-xs font-medium">
            Group Label
          </Label>
          <Input
            id="radio-label"
            value={String(currentProps.label || "")}
            onChange={(e) => handlePropChange("label", e.target.value)}
            placeholder="Choose an option"
            className="text-xs"
          />
        </div>

        {/* Default Value */}
        <div className="space-y-2">
          <Label htmlFor="radio-default" className="text-xs font-medium">
            Default Selected Option
          </Label>
          <Input
            id="radio-default"
            value={String(currentProps.defaultValue || "")}
            onChange={(e) => handlePropChange("defaultValue", e.target.value)}
            placeholder="Option 1"
            className="text-xs"
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="radio-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="radio-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted rounded">
          <p>Note: This component uses predefined options (Option 1, Option 2, Option 3) for the design tool demo.</p>
        </div>
      </CardContent>
    </Card>
  )
} 