"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { avatarConfig } from './config'

export function AvatarPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || avatarConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Avatar Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Source */}
        <div className="space-y-2">
          <Label htmlFor="avatar-src" className="text-xs font-medium">
            Image URL
          </Label>
          <Input
            id="avatar-src"
            value={String(currentProps.src || "")}
            onChange={(e) => handlePropChange("src", e.target.value)}
            placeholder="https://example.com/avatar.jpg"
            className="text-xs"
          />
        </div>

        {/* Fallback Text */}
        <div className="space-y-2">
          <Label htmlFor="avatar-fallback" className="text-xs font-medium">
            Fallback Text
          </Label>
          <Input
            id="avatar-fallback"
            value={String(currentProps.fallback || "")}
            onChange={(e) => handlePropChange("fallback", e.target.value)}
            placeholder="JD"
            className="text-xs"
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
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 