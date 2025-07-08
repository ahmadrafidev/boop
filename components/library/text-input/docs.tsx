"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TextInputDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Text Input Component
            <Badge variant="secondary">Form Control</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A form control for collecting single-line text input with support for various input types and validation.
            Essential for forms, search fields, and any interface where users need to enter textual information.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Input Types</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Text Input</Label>
                    <Input placeholder="Enter your name" className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>Email Input</Label>
                    <Input type="email" placeholder="Enter your email" className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password Input</Label>
                    <Input type="password" placeholder="Enter your password" className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>Number Input</Label>
                    <Input type="number" placeholder="Enter a number" className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>Disabled Input</Label>
                    <Input placeholder="This is disabled" disabled className="w-64" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label>Search Field</Label>
                    <Input placeholder="Search for products..." className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>First Name</Label>
                    <Input placeholder="John" className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone Number</Label>
                    <Input placeholder="+1 (555) 123-4567" className="w-64" />
                  </div>
                  <div className="space-y-1">
                    <Label>Website URL</Label>
                    <Input placeholder="https://example.com" className="w-64" />
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
                    The label text displayed above the input field. Default: "Label"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">placeholder</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Placeholder text shown when input is empty. Default: "Enter text..."
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">type</code>
                    <Badge variant="outline">select</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    The input type which affects validation and keyboard. Default: "text"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["text", "email", "password", "number"].map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
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
                    Whether the input is disabled and non-interactive. Default: false
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Labels and Instructions</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Always provide clear, descriptive labels</li>
                    <li>• Use placeholder text for examples, not instructions</li>
                    <li>• Associate labels with inputs using <code>htmlFor</code></li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Validation and Errors</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Provide clear error messages near the input</li>
                    <li>• Use <code>aria-describedby</code> for additional instructions</li>
                    <li>• Mark required fields appropriately</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Tab</code> - Move between form fields</li>
                    <li>• All standard text editing shortcuts work</li>
                    <li>• Consider autocomplete attributes for better UX</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use appropriate input types for better mobile keyboards</li>
                    <li>• Group related fields with fieldset and legend</li>
                    <li>• Provide helpful placeholder text and examples</li>
                    <li>• Consider character limits and validation feedback</li>
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