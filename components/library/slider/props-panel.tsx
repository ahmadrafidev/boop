"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { sliderConfig } from './config'

export function SliderPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || sliderConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Slider Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="slider-label" className="text-xs font-medium">
            Label
          </Label>
          <Input
            id="slider-label"
            value={String(currentProps.label || "")}
            onChange={(e) => handlePropChange("label", e.target.value)}
            placeholder="Slider label"
            className="text-xs"
          />
        </div>

        {/* Current Value */}
        <div className="space-y-2">
          <Label htmlFor="slider-value" className="text-xs font-medium">
            Current Value
          </Label>
          <Input
            id="slider-value"
            type="number"
            value={String(currentProps.value || "")}
            onChange={(e) => handlePropChange("value", e.target.value)}
            placeholder="50"
            className="text-xs"
          />
        </div>

        {/* Min Value */}
        <div className="space-y-2">
          <Label htmlFor="slider-min" className="text-xs font-medium">
            Minimum Value
          </Label>
          <Input
            id="slider-min"
            type="number"
            value={String(currentProps.min || "")}
            onChange={(e) => handlePropChange("min", e.target.value)}
            placeholder="0"
            className="text-xs"
          />
        </div>

        {/* Max Value */}
        <div className="space-y-2">
          <Label htmlFor="slider-max" className="text-xs font-medium">
            Maximum Value
          </Label>
          <Input
            id="slider-max"
            type="number"
            value={String(currentProps.max || "")}
            onChange={(e) => handlePropChange("max", e.target.value)}
            placeholder="100"
            className="text-xs"
          />
        </div>

        {/* Step */}
        <div className="space-y-2">
          <Label htmlFor="slider-step" className="text-xs font-medium">
            Step
          </Label>
          <Input
            id="slider-step"
            type="number"
            value={String(currentProps.step || "")}
            onChange={(e) => handlePropChange("step", e.target.value)}
            placeholder="1"
            className="text-xs"
            min="0.01"
            step="0.01"
          />
        </div>

        {/* Show Value */}
        <div className="flex items-center justify-between">
          <Label htmlFor="slider-showValue" className="text-xs font-medium">
            Show Value Labels
          </Label>
          <Switch
            id="slider-showValue"
            checked={Boolean(currentProps.showValue)}
            onCheckedChange={(checked) => handlePropChange("showValue", checked)}
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="slider-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="slider-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 