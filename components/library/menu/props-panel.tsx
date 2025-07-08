"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { menuConfig } from './config'

export function MenuPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || menuConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Menu Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trigger Text */}
        <div className="space-y-2">
          <Label htmlFor="menu-trigger" className="text-xs font-medium">
            Trigger Text
          </Label>
          <Input
            id="menu-trigger"
            value={String(currentProps.triggerText || "")}
            onChange={(e) => handlePropChange("triggerText", e.target.value)}
            placeholder="Open Menu"
            className="text-xs"
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="menu-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="menu-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted rounded">
          <p>Note: This component uses predefined menu items (Edit, Copy, Share, Delete) for the design tool demo.</p>
        </div>
      </CardContent>
    </Card>
  )
} 