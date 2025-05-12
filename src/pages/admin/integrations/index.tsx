
import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Plus, Link2, ExternalLink, Database, Code, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function AdminIntegrations() {
  const { toast } = useToast();
  
  // Sample integrations data for demonstration
  const integrations = [
    {
      id: '1',
      name: 'EHR System Integration',
      description: 'Connects to Electronic Health Record systems via FHIR API.',
      status: 'active',
      lastSync: '2023-06-12T09:30:00',
      type: 'data'
    },
    {
      id: '2',
      name: 'Payment Gateway',
      description: 'Processes payments for innovation submissions.',
      status: 'inactive',
      lastSync: null,
      type: 'payment'
    },
    {
      id: '3',
      name: 'Email Service',
      description: 'Handles transactional emails to users.',
      status: 'active',
      lastSync: '2023-06-15T14:22:00',
      type: 'communication'
    },
    {
      id: '4',
      name: 'Analytics Platform',
      description: 'Tracks platform usage and user behavior.',
      status: 'warning',
      lastSync: '2023-06-14T08:45:00',
      type: 'analytics'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="text-gray-500">Inactive</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Warning</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch(type) {
      case 'data':
        return <Database className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <Code className="h-5 w-5 text-purple-500" />;
      case 'communication':
        return <Link2 className="h-5 w-5 text-green-500" />;
      case 'analytics':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <ExternalLink className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleTestIntegration = (id: string, name: string) => {
    toast({
      title: "Testing Integration",
      description: `Testing connection to ${name}...`,
    });
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Integration Test Complete",
        description: `Successfully connected to ${name}`,
        variant: "success",
      });
    }, 2000);
  };

  return (
    <AdminLayout
      title="Integrations"
      description="Manage external services and API connections"
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Integration
        </Button>
      }
    >
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {integrations
            .filter(integration => integration.status === 'active')
            .map(integration => (
              <Card key={integration.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    {getIntegrationIcon(integration.type)}
                    <CardTitle className="text-xl font-semibold">{integration.name}</CardTitle>
                  </div>
                  {getStatusBadge(integration.status)}
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{integration.description}</CardDescription>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Last synced: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestIntegration(integration.id, integration.name)}
                      >
                        Test Connection
                      </Button>
                      <Button 
                        size="sm"
                        asChild
                      >
                        <Link to={`/dashboard/admin/integrations/${integration.id}`}>
                          Configure
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {integrations.map(integration => (
            <Card key={integration.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  {getIntegrationIcon(integration.type)}
                  <CardTitle className="text-xl font-semibold">{integration.name}</CardTitle>
                </div>
                {getStatusBadge(integration.status)}
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{integration.description}</CardDescription>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Last synced: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestIntegration(integration.id, integration.name)}
                    >
                      Test Connection
                    </Button>
                    <Button 
                      size="sm"
                      asChild
                    >
                      <Link to={`/dashboard/admin/integrations/${integration.id}`}>
                        Configure
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="available">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>EHR Integration</CardTitle>
                <CardDescription>Connect with Electronic Health Record systems</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect to major EHR platforms using standard FHIR APIs. Enable secure data exchange for patient records.
                </p>
                <Button>Set Up Integration</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Research Database</CardTitle>
                <CardDescription>Access medical research databases</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect to clinical research repositories and academic databases for evidence-based innovation validation.
                </p>
                <Button>Set Up Integration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
