
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AIChat } from "@/components/ai/AIChat";
import { ImageGenerator } from "@/components/ai/ImageGenerator";
import { useAI } from "@/context/AIContext";
import { BotIcon, ImageIcon, TextIcon, LayoutDashboardIcon, ActivityIcon, Settings2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";

export default function AIDashboard() {
  const { isInitialized, serviceStatus, isProcessing, error } = useAI();
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    document.title = "AI Dashboard | MOH Innovation Platform";
  }, []);
  
  return (
    <div className="container py-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">AI Dashboard</h1>
      <p className="text-muted-foreground mb-6">
        Explore and utilize AI capabilities across the platform
      </p>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 h-auto">
          <TabsTrigger value="overview" className="flex flex-col py-2 px-4 h-auto">
            <LayoutDashboardIcon className="mb-1 h-5 w-5" />
            <span className="text-xs">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex flex-col py-2 px-4 h-auto">
            <BotIcon className="mb-1 h-5 w-5" />
            <span className="text-xs">Assistant</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex flex-col py-2 px-4 h-auto">
            <ImageIcon className="mb-1 h-5 w-5" />
            <span className="text-xs">Images</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex flex-col py-2 px-4 h-auto">
            <TextIcon className="mb-1 h-5 w-5" />
            <span className="text-xs">Content</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col py-2 px-4 h-auto">
            <ActivityIcon className="mb-1 h-5 w-5" />
            <span className="text-xs">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex flex-col py-2 px-4 h-auto">
            <Settings2Icon className="mb-1 h-5 w-5" />
            <span className="text-xs">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">AI Services</CardTitle>
                <CardDescription>Status of AI services</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {Object.entries(serviceStatus).map(([service, status]) => (
                    <li key={service} className="flex items-center justify-between">
                      <span>{service}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {status ? 'Available' : 'Unavailable'}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common AI tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={() => setActiveTab("assistant")} className="w-full justify-start">
                  <BotIcon className="mr-2 h-4 w-4" />
                  Chat with Assistant
                </Button>
                <Button onClick={() => setActiveTab("images")} className="w-full justify-start">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Generate Image
                </Button>
                <Button onClick={() => setActiveTab("content")} className="w-full justify-start">
                  <TextIcon className="mr-2 h-4 w-4" />
                  Generate Content
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your recent AI interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">No recent activity</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="assistant" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIChat 
              title="General Assistant" 
              description="Ask me anything about the platform"
              context="general"
              initialMessage="Hello! I'm your MOH Innovation Platform assistant. How can I help you today?"
            />
            
            <AIChat 
              title="Innovation Assistant" 
              description="Get help with healthcare innovation"
              context="innovation"
              initialMessage="I'm your innovation assistant. I can help you develop healthcare innovation ideas, evaluate concepts, and guide you through our innovation process."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIChat 
              title="Regulatory Assistant" 
              description="Get guidance on regulatory compliance"
              context="regulatory"
              initialMessage="I'm your regulatory assistant. I can help you understand healthcare regulations, compliance requirements, and sandbox applications."
            />
            
            <AIChat 
              title="Admin Assistant" 
              description="Get help with platform administration"
              context="admin-panel"
              initialMessage="I'm your administration assistant. I can help with user management, analytics insights, and platform administration tasks."
            />
          </div>
        </TabsContent>
        
        <TabsContent value="images">
          <ImageGenerator 
            title="Healthcare Image Generator"
            description="Generate healthcare-related images for your projects"
          />
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Generation</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is under development. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>AI Analytics</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is under development. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>AI Settings</CardTitle>
              <CardDescription>Coming soon...</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This feature is under development. Check back soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
