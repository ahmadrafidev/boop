"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ButtonDocumentation() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Button Component
            <Badge variant="secondary">Interactive</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A versatile clickable component with multiple variants and sizes for triggering actions or navigation. 
            Built on top of the HTML button element with enhanced styling and accessibility features.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Variants</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Sizes</h4>
                <div className="flex items-center gap-2">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">States</h4>
                <div className="flex gap-2">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">children</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The text content displayed inside the button. Default: "Button"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">variant</code>
                    <Badge variant="outline">select</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    The visual style variant of the button. Default: "default"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["default", "destructive", "outline", "secondary", "ghost", "link"].map((variant) => (
                      <Badge key={variant} variant="secondary" className="text-xs">
                        {variant}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">size</code>
                    <Badge variant="outline">select</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    The size of the button. Default: "default"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["default", "sm", "lg", "icon"].map((size) => (
                      <Badge key={size} variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">disabled</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether the button is disabled and non-interactive. Default: false
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Tab</code> - Move focus to the button</li>
                    <li>• <code>Enter</code> or <code>Space</code> - Activate the button</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Automatically announces as "button"</li>
                    <li>• Reads the button text content</li>
                    <li>• Announces disabled state when applicable</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use descriptive text that clearly indicates the action</li>
                    <li>• Avoid generic text like "Click here" or "Read more"</li>
                    <li>• Consider using aria-label for icon-only buttons</li>
                    <li>• Ensure sufficient color contrast (4.5:1 minimum)</li>
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