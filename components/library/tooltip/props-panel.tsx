"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ComponentPropsPanelProps } from '../types'
import { tooltipConfig } from './config'

export function TooltipPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || tooltipConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Tooltip Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trigger Text */}
        <div className="space-y-2">
          <Label htmlFor="tooltip-children" className="text-xs font-medium">
            Trigger Text
          </Label>
          <Input
            id="tooltip-children"
            value={String(currentProps.children || "")}
            onChange={(e) => handlePropChange("children", e.target.value)}
            placeholder="Hover me"
            className="text-xs"
          />
        </div>

        {/* Tooltip Content */}
        <div className="space-y-2">
          <Label htmlFor="tooltip-content" className="text-xs font-medium">
            Tooltip Content
          </Label>
          <Textarea
            id="tooltip-content"
            value={String(currentProps.content || "")}
            onChange={(e) => handlePropChange("content", e.target.value)}
            placeholder="Tooltip content"
            className="text-xs resize-none"
            rows={3}
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="tooltip-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="tooltip-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 