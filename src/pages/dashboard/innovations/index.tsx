
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AIChallengeGenerator } from "@/components/innovation/AIChallengeGenerator";
import { ProposalScoringTool } from "@/components/innovation/ProposalScoringTool";
import { DuplicateChallengeDetector } from "@/components/innovation/DuplicateChallengeDetector";

export default function DashboardInnovationsPage() {
  const [activeTab, setActiveTab] = useState("my-innovations");
  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Innovations</h1>
        <div className="flex space-x-2">
          <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
            <Link to="/dashboard/innovations/new">
              <PlusCircle className="h-5 w-5 mr-2" />
              Submit Innovation
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="my-innovations">My Innovations</TabsTrigger>
          <TabsTrigger value="all-innovations">All Innovations</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-innovations">
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-4">No innovations yet</h3>
            <p className="text-gray-600 mb-8">You haven't submitted any innovations yet.</p>
            <Button asChild>
              <Link to="/dashboard/innovations/new">Submit Your First Innovation</Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="all-innovations">
          <div className="text-center py-16">
            <h3 className="text-xl font-medium">No innovations available</h3>
            <p className="text-gray-600">No public innovations are available at the moment.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-tools">
          <div className="space-y-8">
            <AIChallengeGenerator />
            <ProposalScoringTool />
            <DuplicateChallengeDetector />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
