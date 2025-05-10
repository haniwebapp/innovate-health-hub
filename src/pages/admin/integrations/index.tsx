
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, DatabaseIcon, MessageSquare, Plug, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import IntegrationList from '@/components/admin/IntegrationList';
import IntegrationLogs from '@/components/admin/IntegrationLogs';

export default function AdminIntegrationsPage2() {
  const [showLogs, setShowLogs] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');

  const toggleLogs = (integration: string) => {
    if (selectedIntegration === integration && showLogs) {
      setShowLogs(false);
    } else {
      setSelectedIntegration(integration);
      setShowLogs(true);
    }
  };

  return (
    <AdminLayout
      title="Integrations Panel"
      description="Manage external integrations and connections"
      actions={
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      }
    >
      <Tabs defaultValue="data" className="space-y-6">
        <TabsList>
          <TabsTrigger value="data">Data & APIs</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-6">
          <IntegrationList
            category="data"
            title="Data & API"
            description="Manage database and API integrations"
          />

          {showLogs && selectedIntegration === 'Supabase' && (
            <IntegrationLogs integrationId="1234-5678-9012" />
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Database Management</CardTitle>
              <CardDescription>Manage database connections and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-muted/50">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <DatabaseIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Supabase</p>
                      <p className="text-xs text-muted-foreground">Primary database connection</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleLogs('Supabase')}
                    >
                      {selectedIntegration === 'Supabase' && showLogs ? 'Hide Logs' : 'Show Logs'}
                    </Button>
                    <Button size="sm" asChild>
                      <Link to="/admin/integrations/database">
                        Manage
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication">
          <IntegrationList
            category="communication"
            title="Communication"
            description="Manage email, SMS, and messaging integrations"
          />
        </TabsContent>

        <TabsContent value="payment">
          <IntegrationList
            category="payment"
            title="Payment"
            description="Manage payment gateway integrations"
          />
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Integration Audit Logs</CardTitle>
              <CardDescription>Monitor integration activities and events</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-10">
              <Plug className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Audit logging will be implemented in Phase 3.</p>
              <Button>View All Logs</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
