"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProgressDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Progress Component
            <Badge variant="secondary">Indicator</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A visual indicator for displaying the progress or completion status of an operation with optional label.
            Perfect for showing upload progress, form completion, loading states, or any multi-step process.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Progress Values</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>25%</span>
                      <span>25/100</span>
                    </div>
                    <Progress value={25} className="w-64" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>50%</span>
                      <span>50/100</span>
                    </div>
                    <Progress value={50} className="w-64" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>75%</span>
                      <span>75/100</span>
                    </div>
                    <Progress value={75} className="w-64" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>100%</span>
                      <span>100/100</span>
                    </div>
                    <Progress value={100} className="w-64" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">File Upload Progress</p>
                    <Progress value={67} className="w-64" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Form Completion</p>
                    <Progress value={40} className="w-64" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Installation Progress</p>
                    <Progress value={85} className="w-64" />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">value</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The current value of the progress indicator. Default: "50"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">max</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The maximum value for the progress indicator. Default: "100"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">showLabel</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether to show the value labels below the progress bar. Default: true
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">ARIA Attributes</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Uses <code>role="progressbar"</code></li>
                    <li>• Includes <code>aria-valuenow</code>, <code>aria-valuemin</code>, <code>aria-valuemax</code></li>
                    <li>• Supports <code>aria-label</code> or <code>aria-labelledby</code></li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Announces current progress percentage</li>
                    <li>• Reads progress updates as they occur</li>
                    <li>• Provides context about completion status</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Always provide meaningful labels for context</li>
                    <li>• Update progress smoothly to avoid jarring changes</li>
                    <li>• Consider indeterminate state for unknown durations</li>
                    <li>• Provide completion notifications</li>
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