
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, Settings, RefreshCw } from "lucide-react";
import { AIService } from "@/services/ai/AIService";
import { useState, useEffect } from "react";

export default function AdminAIPage() {
  const [aiStatus, setAiStatus] = useState({
    investment: true,
    regulatory: true,
    innovation: true,
    knowledge: true,
    policy: true,
    overall: true
  });
  
  const [isChecking, setIsChecking] = useState(false);
  
  useEffect(() => {
    checkAiServices();
  }, []);
  
  const checkAiServices = async () => {
    setIsChecking(true);
    try {
      const status = await AIService.checkAIServices();
      setAiStatus(status);
    } catch (error) {
      console.error("Error checking AI services:", error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <AdminLayout
      title="AI Administration"
      description="Manage and monitor AI services across the platform"
      actions={
        <Button onClick={checkAiServices} disabled={isChecking}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Checking...' : 'Check Services'}
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={`h-3 w-3 rounded-full mr-2 ${aiStatus.investment ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Investment AI
            </CardTitle>
            <CardDescription>
              AI services for investment analysis and matching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                {aiStatus.investment ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={`h-3 w-3 rounded-full mr-2 ${aiStatus.regulatory ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Regulatory AI
            </CardTitle>
            <CardDescription>
              AI services for regulatory compliance and analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                {aiStatus.regulatory ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={`h-3 w-3 rounded-full mr-2 ${aiStatus.innovation ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Innovation AI
            </CardTitle>
            <CardDescription>
              AI services for innovation assessment and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                {aiStatus.innovation ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={`h-3 w-3 rounded-full mr-2 ${aiStatus.knowledge ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Knowledge AI
            </CardTitle>
            <CardDescription>
              AI services for knowledge management and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                {aiStatus.knowledge ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className={`h-3 w-3 rounded-full mr-2 ${aiStatus.policy ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Policy AI
            </CardTitle>
            <CardDescription>
              AI services for policy analysis and compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </Button>
              <Button size="sm" variant="outline">
                {aiStatus.policy ? (
                  <>
                    <PauseCircle className="h-4 w-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Activate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
