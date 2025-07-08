"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function TabsDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Tabs Component
            <Badge variant="secondary">Navigation</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            A navigation component that allows users to switch between different content panels or views.
            Perfect for organizing related content into separate sections while maintaining a clean, accessible interface.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Basic Tabs</h4>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        This tab contains summary information and key metrics.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Details</h3>
                      <p className="text-sm text-muted-foreground">
                        Detailed information and comprehensive data are shown here.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="settings" className="mt-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        Configuration options and preferences can be managed in this section.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium">User Profile</h5>
                    <Tabs defaultValue="profile" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                      </TabsList>
                      <TabsContent value="profile" className="mt-2">
                        <p className="text-xs text-muted-foreground">Personal information and bio</p>
                      </TabsContent>
                      <TabsContent value="security" className="mt-2">
                        <p className="text-xs text-muted-foreground">Password and authentication settings</p>
                      </TabsContent>
                      <TabsContent value="notifications" className="mt-2">
                        <p className="text-xs text-muted-foreground">Email and push notification preferences</p>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">defaultValue</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The default active tab value. Default: "Tab 1"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">disabled</code>
                    <Badge variant="outline">boolean</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Whether the entire tabs component is disabled. Default: false
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Tab</code> - Move focus to tab list</li>
                    <li>• <code>Arrow Keys</code> - Navigate between tab triggers</li>
                    <li>• <code>Space</code> or <code>Enter</code> - Activate focused tab</li>
                    <li>• <code>Home/End</code> - Jump to first/last tab</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Uses proper ARIA roles (tablist, tab, tabpanel)</li>
                    <li>• Announces tab position and total count</li>
                    <li>• Associates tab triggers with their content panels</li>
                    <li>• Indicates selected state for active tab</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use clear, descriptive tab labels</li>
                    <li>• Keep the number of tabs manageable (3-7 recommended)</li>
                    <li>• Don't use tabs for sequential processes (use steppers instead)</li>
                    <li>• Ensure tab content is substantial enough to warrant separation</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Content Guidelines</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Each tab should contain related, substantial content</li>
                    <li>• Avoid nesting tabs within tabs</li>
                    <li>• Consider the logical flow between tab contents</li>
                    <li>• Use consistent content structure across tabs</li>
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