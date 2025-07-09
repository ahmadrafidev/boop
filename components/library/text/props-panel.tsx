"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ComponentPropsPanelProps } from '../types'
import { textConfig } from './config'

export function TextPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || textConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Text Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="text-content" className="text-xs font-medium">
            Text Content
          </Label>
          <Textarea
            id="text-content"
            value={String(currentProps.children || "")}
            onChange={(e) => handlePropChange("children", e.target.value)}
            placeholder="Enter text content"
            className="text-xs resize-none"
            rows={3}
          />
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
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
              <SelectItem value="xl">Extra Large</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="muted">Muted</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 