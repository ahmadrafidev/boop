"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TextDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Text Component
            <Badge variant="secondary">Typography</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A typography component for displaying text content with various sizes, weights, and styles.
            Perfect for headings, body text, captions, and any textual content in your interface.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Text Sizes</h4>
                <div className="space-y-2">
                  <p className="text-sm">Small text - Perfect for captions and labels</p>
                  <p className="text-base">Default text - Standard body text size</p>
                  <p className="text-lg">Large text - Great for subheadings</p>
                  <p className="text-xl">Extra large text - Eye-catching headlines</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Text Variants</h4>
                <div className="space-y-2">
                  <p className="text-foreground">Default text - Standard readable text</p>
                  <p className="text-muted-foreground">Muted text - Less prominent information</p>
                  <p className="text-destructive">Destructive text - Error messages and warnings</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-2">
                  <p className="text-xl">Main Heading</p>
                  <p className="text-lg text-muted-foreground">Subheading with muted styling</p>
                  <p className="text-base">Regular body text explaining the content and providing detailed information to users.</p>
                  <p className="text-sm text-muted-foreground">Small caption or metadata</p>
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
                    The text content to display. Default: "Sample text"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">size</code>
                    <Badge variant="outline">select</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    The size of the text. Default: "default"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["sm", "default", "lg", "xl"].map((size) => (
                      <Badge key={size} variant="secondary" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">variant</code>
                    <Badge variant="outline">select</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    The visual style variant of the text. Default: "default"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["default", "muted", "destructive"].map((variant) => (
                      <Badge key={variant} variant="secondary" className="text-xs">
                        {variant}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Semantic HTML</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use appropriate heading tags (h1-h6) for hierarchical content</li>
                    <li>• Utilize paragraph tags for body text</li>
                    <li>• Consider semantic elements like <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code></li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Color Contrast</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Ensure minimum 4.5:1 contrast ratio for normal text</li>
                    <li>• Use 3:1 contrast ratio for large text (18pt+ or 14pt+ bold)</li>
                    <li>• Test with color blindness simulators</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use consistent type scales throughout your application</li>
                    <li>• Avoid using color alone to convey meaning</li>
                    <li>• Maintain readable line heights and spacing</li>
                    <li>• Test readability at different zoom levels</li>
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