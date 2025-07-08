"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SliderDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Slider Component
            <Badge variant="secondary">Form Control</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            An interactive component for selecting a numeric value within a specified range with optional step intervals.
            Perfect for settings, filters, volume controls, and any interface where users need to select from a continuous range.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Basic Sliders</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Volume (0-100)</Label>
                    <Slider value={[75]} min={0} max={100} className="w-64" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span className="font-medium">75</span>
                      <span>100</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Temperature (10-30°C)</Label>
                    <Slider value={[22]} min={10} max={30} className="w-64" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span className="font-medium">22</span>
                      <span>30</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Disabled Slider</Label>
                    <Slider value={[50]} min={0} max={100} disabled className="w-64" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Brightness Control</Label>
                    <Slider value={[80]} min={0} max={100} className="w-48" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Price Range ($0-$1000)</Label>
                    <Slider value={[350]} min={0} max={1000} className="w-48" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Zoom Level (25%-400%)</Label>
                    <Slider value={[100]} min={25} max={400} className="w-48" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">label</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The label text displayed above the slider. Default: "Value"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">value</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The current value of the slider. Default: "50"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">min</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The minimum value of the slider range. Default: "0"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">max</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The maximum value of the slider range. Default: "100"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">step</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The step increment for slider values. Default: "1"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">showValue</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether to show the current value and range labels. Default: true
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">disabled</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether the slider is disabled and non-interactive. Default: false
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Tab</code> - Move focus to the slider</li>
                    <li>• <code>Arrow Keys</code> - Increase/decrease value by step</li>
                    <li>• <code>Home</code> - Set to minimum value</li>
                    <li>• <code>End</code> - Set to maximum value</li>
                    <li>• <code>Page Up/Down</code> - Larger increments</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Uses <code>role="slider"</code></li>
                    <li>• Announces current value and range</li>
                    <li>• Provides orientation and step information</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Provide clear labels indicating what the slider controls</li>
                    <li>• Show current value and units when relevant</li>
                    <li>• Use appropriate step increments for the use case</li>
                    <li>• Consider touch target size for mobile devices</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 