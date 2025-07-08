"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { checkboxConfig } from './config'

export function CheckboxPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || checkboxConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Checkbox Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="checkbox-label" className="text-xs font-medium">
            Label
          </Label>
          <Input
            id="checkbox-label"
            value={String(currentProps.label || "")}
            onChange={(e) => handlePropChange("label", e.target.value)}
            placeholder="Checkbox label"
            className="text-xs"
          />
        </div>

        {/* Checked */}
        <div className="flex items-center justify-between">
          <Label htmlFor="checkbox-checked" className="text-xs font-medium">
            Checked
          </Label>
          <Switch
            id="checkbox-checked"
            checked={Boolean(currentProps.checked)}
            onCheckedChange={(checked) => handlePropChange("checked", checked)}
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="checkbox-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="checkbox-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 