"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SwitchDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Switch Component
            <Badge variant="secondary">Form Control</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A toggle component for switching between two states with a sliding animation effect.
            Perfect for settings, preferences, and any binary choice where the visual feedback enhances user experience.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">States</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="off" />
                    <Label htmlFor="off">Off (Default)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="on" checked />
                    <Label htmlFor="on">On (Checked)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="disabled-off" disabled />
                    <Label htmlFor="disabled-off">Disabled (Off)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="disabled-on" disabled checked />
                    <Label htmlFor="disabled-on">Disabled (On)</Label>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="dark-mode" />
                    <Label htmlFor="dark-mode">Dark mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-save" checked />
                    <Label htmlFor="auto-save">Auto-save documents</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="public-profile" />
                    <Label htmlFor="public-profile">Make profile public</Label>
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
                    The label text displayed next to the switch. Default: "Switch"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">checked</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether the switch is checked/enabled. Default: false
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">disabled</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether the switch is disabled and non-interactive. Default: false
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Tab</code> - Move focus to the switch</li>
                    <li>• <code>Space</code> or <code>Enter</code> - Toggle the switch state</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Automatically announces as "switch"</li>
                    <li>• Reads the label and current state (on/off)</li>
                    <li>• Announces state changes when toggled</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use for immediate effect changes (not for form submission)</li>
                    <li>• Provide clear, descriptive labels</li>
                    <li>• Consider using checkboxes for form data</li>
                    <li>• Group related switches with proper headings</li>
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