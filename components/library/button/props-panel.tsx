"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { buttonConfig } from './config'

export function ButtonPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || buttonConfig.definition.defaultProps
  
  const handlePropChange = (propName: string, value: string | number | boolean | undefined) => {
    if (instance) {
      // Canvas mode - update actual instance
      onUpdateProps(instance.id, { ...instance.props, [propName]: value })
    } else {
      // Preview mode - update preview props
      const newProps = { ...currentProps, [propName]: value }
      onPreviewPropsChange?.(newProps)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Button Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text Content */}
        <div className="space-y-2">
          <Label htmlFor="button-children" className="text-xs font-medium">
            Text Content
          </Label>
          <Input
            id="button-children"
            value={String(currentProps.children || "")}
            onChange={(e) => handlePropChange("children", e.target.value)}
            placeholder="Button text"
            className="text-xs"
          />
        </div>

        {/* Variant */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Variant</Label>
          <Select
            value={String(currentProps.variant || "default")}
            onValueChange={(value) => handlePropChange("variant", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
              <SelectItem value="link">Link</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Size</Label>
          <Select
            value={String(currentProps.size || "default")}
            onValueChange={(value) => handlePropChange("size", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="icon">Icon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="button-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="button-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 