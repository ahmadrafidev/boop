"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CardDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Card Component
            <Badge variant="secondary">Container</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A container component for organizing related content with optional header, footer, and content sections.
            Cards are versatile containers that can display information in a structured, visually appealing way.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Basic Card</h4>
                <Card className="w-64">
                  <CardHeader>
                    <CardTitle>Example Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">This is an example card with some content.</p>
                  </CardContent>
                </Card>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Variants</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle className="text-sm">Default</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Standard card style</p>
                    </CardContent>
                  </Card>
                  <Card variant="outline" className="w-48">
                    <CardHeader>
                      <CardTitle className="text-sm">Outline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Outlined card style</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">title</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The title displayed in the card header. Default: "Card Title"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">content</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The main content text displayed in the card body. Default: "Card content goes here"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">variant</code>
                    <Badge variant="outline">select</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    The visual style variant of the card. Default: "default"
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["default", "outline"].map((variant) => (
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
                  <h4 className="font-medium mb-2">Structure</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Cards should have clear hierarchical structure</li>
                    <li>• Use semantic HTML elements within cards</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Interactive cards should be keyboard accessible</li>
                    <li>• Use proper focus management for card interactions</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Group related information together</li>
                    <li>• Maintain consistent card layouts</li>
                    <li>• Ensure sufficient color contrast for text</li>
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