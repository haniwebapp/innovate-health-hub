
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, ExternalLink, Info, Layers, LockIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  getAICapabilityCategoryInfo, 
  getCapabilitiesByPhase, 
  getAdminCapabilities 
} from "@/data/ai-capabilities";
import { AICapabilityStatus } from "@/types/ai-capabilities";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminJourney() {
  const [activeTab, setActiveTab] = useState("phases");
  const phases = getCapabilitiesByPhase();
  const categories = getAICapabilityCategoryInfo();
  const adminCapabilities = getAdminCapabilities();
  
  const getStatusColor = (status: AICapabilityStatus) => {
    switch(status) {
      case AICapabilityStatus.LIVE:
        return "bg-green-500";
      case AICapabilityStatus.BETA:
        return "bg-yellow-500"; 
      case AICapabilityStatus.IN_DEVELOPMENT:
        return "bg-blue-500";
      case AICapabilityStatus.PLANNED:
        return "bg-slate-500";
      case AICapabilityStatus.DEPRECATED:
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };
  
  const getStatusBadge = (status: AICapabilityStatus) => {
    switch(status) {
      case AICapabilityStatus.LIVE:
        return <Badge className="bg-green-500"><Check size={12} className="mr-1" /> Live</Badge>;
      case AICapabilityStatus.BETA:
        return <Badge className="bg-yellow-500">Beta</Badge>;
      case AICapabilityStatus.IN_DEVELOPMENT:
        return <Badge className="bg-blue-500">In Development</Badge>;
      case AICapabilityStatus.PLANNED:
        return <Badge variant="outline" className="text-slate-500 border-slate-300"><Clock size={12} className="mr-1" /> Planned</Badge>;
      case AICapabilityStatus.DEPRECATED:
        return <Badge variant="destructive">Deprecated</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={24} className="text-moh-gold" />
          <h1 className="text-3xl font-bold">Admin Capabilities Roadmap</h1>
        </div>
        <p className="text-muted-foreground">
          Administrative tools and AI capabilities for platform management
        </p>
      </header>
      
      <Tabs defaultValue="phases" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="phases">Implementation Phases</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="list">Complete List</TabsTrigger>
        </TabsList>
        
        {/* Implementation Phases Tab */}
        <TabsContent value="phases" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase) => {
              const adminPhaseCaps = phase.capabilities.filter(cap => cap.isAdminOnly);
              return (
                <Card key={phase.id} className={`border-l-4 ${phase.status === 'in-progress' ? 'border-l-moh-gold' : 'border-l-slate-300'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{phase.name}</CardTitle>
                      <Badge variant={phase.status === 'in-progress' ? 'default' : 'outline'} className={phase.status === 'in-progress' ? 'bg-moh-gold' : ''}>
                        {phase.status === 'completed' && <Check size={12} className="mr-1" />}
                        {phase.status === 'in-progress' ? 'In Progress' : phase.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                    </div>
                    <CardDescription>{phase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{phase.startDate}</span>
                      <span>{phase.endDate || '→'}</span>
                    </div>
                    <Progress value={phase.status === 'completed' ? 100 : phase.status === 'in-progress' ? 35 : 0} className="h-2" />
                    
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Admin Features</span>
                        <span className="text-muted-foreground">{adminPhaseCaps.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Implemented</span>
                        <span className="text-muted-foreground">
                          {adminPhaseCaps.filter(c => c.status === AICapabilityStatus.LIVE).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full flex items-center justify-center gap-1" onClick={() => setActiveTab("list")}>
                      View Features <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          
          <Card className="bg-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">Admin Implementation Journey</CardTitle>
              <CardDescription>Our roadmap for implementing administrative AI capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 border-l-2 border-dashed border-slate-300"></div>
                
                <div className="space-y-8">
                  <div className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-moh-gold rounded-full flex items-center justify-center text-white">1</div>
                    <h3 className="font-bold text-lg mb-1">Phase 1: Core Admin Tools</h3>
                    <p className="text-muted-foreground mb-2">Q4 2023 - Q2 2024</p>
                    <div className="space-y-1 text-sm">
                      <p>• Admin dashboards and monitoring</p>
                      <p>• Basic AI logs and governance</p>
                      <p>• Automated review assistance</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white">2</div>
                    <h3 className="font-bold text-lg mb-1">Phase 2: Advanced Administrative Features</h3>
                    <p className="text-muted-foreground mb-2">Q2 2024 - Q4 2024</p>
                    <div className="space-y-1 text-sm">
                      <p>• Enhanced analytics and reporting</p>
                      <p>• Regulatory compliance automation</p>
                      <p>• Policy and content management AI</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-12">
                    <div className="absolute left-0 w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-600">3</div>
                    <h3 className="font-bold text-lg mb-1">Phase 3: Strategic Management Tools</h3>
                    <p className="text-muted-foreground mb-2">Q4 2024 - Q2 2025</p>
                    <div className="space-y-1 text-sm">
                      <p>• Strategic planning and forecasting</p>
                      <p>• Inter-ministerial coordination</p>
                      <p>• Advanced governance and monitoring</p>
                      <p>• National operations dashboards</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories
              .filter(category => adminCapabilities.some(cap => cap.category === category.id))
              .map((category) => {
                const categoryCaps = adminCapabilities.filter(cap => cap.category === category.id);
                const implementedCaps = categoryCaps.filter(cap => 
                  cap.status === AICapabilityStatus.LIVE || 
                  cap.status === AICapabilityStatus.BETA
                );
                
                return (
                  <Card key={category.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-moh-gold/20 flex items-center justify-center text-moh-gold">
                          <Layers size={18} />
                        </div>
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Implementation</span>
                        <span className="text-sm font-medium">
                          {implementedCaps.length} / {categoryCaps.length}
                        </span>
                      </div>
                      <Progress value={(implementedCaps.length / categoryCaps.length) * 100} className="h-2" />
                    </CardContent>
                    <CardFooter className="bg-slate-50 pt-3 pb-3">
                      <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("list")}>
                        View Capabilities
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </TabsContent>
        
        {/* Complete List Tab */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Admin AI Capabilities</CardTitle>
              <CardDescription>Complete list of administrative AI capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[60vh]">
                <div className="space-y-6">
                  {categories
                    .filter(category => adminCapabilities.some(cap => cap.category === category.id))
                    .map((category) => (
                      <div key={category.id} className="pb-4 border-b border-slate-200">
                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                          <Layers size={20} className="text-moh-gold" />
                          {category.name}
                          <LockIcon size={14} className="text-moh-gold" />
                        </h3>
                        
                        <div className="space-y-2">
                          {adminCapabilities
                            .filter(cap => cap.category === category.id)
                            .map(capability => (
                              <div key={capability.id} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-slate-50">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${getStatusColor(capability.status)}`}></div>
                                  <span>{capability.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(capability.status)}
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="w-8 h-8">
                                          <Info size={16} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left" className="max-w-xs">
                                        <p className="font-medium mb-1">{capability.name}</p>
                                        <p className="text-sm">{capability.description}</p>
                                        <p className="text-xs mt-1">Phase {capability.implementationPhase}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
