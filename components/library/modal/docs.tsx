"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ModalDocumentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Modal Component
            <Badge variant="secondary">Overlay</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            An overlay dialog component that displays content above the main interface and requires user interaction.
            Perfect for confirmations, forms, detailed views, or any content that needs focused attention.
          </p>
          
          <Tabs defaultValue="examples" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="props">Properties</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="examples" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Basic Modal</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Example Modal</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Example Modal</DialogTitle>
                      <DialogDescription>
                        This is an example modal dialog. It can contain any content you need.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm">
                        Modals are great for displaying forms, confirmations, or detailed information without 
                        navigating away from the current page.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Use Cases</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Delete Item</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this item? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <span className="text-sm text-muted-foreground">Confirmation dialog</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">Add User</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New User</DialogTitle>
                          <DialogDescription>
                            Enter the details for the new user account.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <span className="text-sm text-muted-foreground">Form modal</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="props" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">triggerText</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The text on the button that opens the modal. Default: "Open Modal"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">title</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The title displayed in the modal header. Default: "Modal Title"
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <code className="text-sm font-mono">description</code>
                    <Badge variant="outline">string</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    The description text shown in the modal body. Default: "Modal description goes here"
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <code>Escape</code> - Close the modal</li>
                    <li>• <code>Tab</code> - Navigate through focusable elements</li>
                    <li>• Focus is trapped within the modal when open</li>
                    <li>• Focus returns to trigger element when closed</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Uses proper ARIA roles and labels</li>
                    <li>• Background content is hidden from screen readers</li>
                    <li>• Modal title and description are properly announced</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">Best Practices</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Use sparingly - avoid nested modals</li>
                    <li>• Provide clear ways to close the modal</li>
                    <li>• Keep content concise and focused</li>
                    <li>• Ensure the purpose is clear from the title</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium mb-2">When to Use</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Critical confirmations or warnings</li>
                    <li>• Quick forms that don't need a full page</li>
                    <li>• Detailed views without navigation</li>
                    <li>• Help documentation or tutorials</li>
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