
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardRegulatoryPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Regulatory Sandbox" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Regulatory Sandbox</h1>
        <p className="text-muted-foreground">
          Test your innovations in a controlled regulatory environment
        </p>
      </div>
      
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="documents">Compliance Documents</TabsTrigger>
          <TabsTrigger value="feedback">MoH Guidance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Sandbox Applications</CardTitle>
              <CardDescription>Apply for regulatory testing environments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <FileCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Regulatory sandbox feature will be implemented in Phase 2.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/regulatory">View Regulatory Guidelines</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents</CardTitle>
              <CardDescription>Upload and manage regulatory documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Document management will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Ministry Guidance</CardTitle>
              <CardDescription>Feedback and guidance from regulatory experts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Regulatory guidance will be implemented in Phase 2.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
