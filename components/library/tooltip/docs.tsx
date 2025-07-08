"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TooltipDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Tooltip Component
            <Badge variant="secondary">Overlay</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A floating component that provides additional information or context when hovering over an element.
            Perfect for explaining features, providing help text, or adding context without cluttering the interface.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Basic Tooltips</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Basic Tooltip</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a basic tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Help Button</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click this button to get help with your account</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" disabled>Disabled</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This action is currently unavailable</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">Save</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save your changes (Ctrl+S)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-sm text-muted-foreground">Keyboard shortcut hint</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">❓</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This field is required for account verification</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-sm text-muted-foreground">Field explanation</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">📊</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View detailed analytics and reports</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-sm text-muted-foreground">Icon button description</span>
                  </div>
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
                    The trigger text that users hover to see the tooltip. Default: "Hover me"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">content</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The tooltip content text that appears on hover. Default: "Tooltip content"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">disabled</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether the tooltip is disabled and won't show. Default: false
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Tab</code> - Focus trigger element shows tooltip</li>
                    <li>• <code>Escape</code> - Hide tooltip when focused</li>
                    <li>• Focus management follows trigger element</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Uses proper ARIA attributes for description</li>
                    <li>• Content is announced when tooltip appears</li>
                    <li>• Associates tooltip with trigger element</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Keep tooltip content concise and helpful</li>
                    <li>• Don't put essential information only in tooltips</li>
                    <li>• Avoid tooltips on mobile where hover doesn't exist</li>
                    <li>• Use for supplementary, not critical information</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">When to Use</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Explaining icon buttons or controls</li>
                    <li>• Providing keyboard shortcuts</li>
                    <li>• Adding context to form fields</li>
                    <li>• Clarifying abbreviated text or terms</li>
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