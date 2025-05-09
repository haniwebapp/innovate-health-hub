
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, Plus, RefreshCw, Send, Settings, Smartphone } from 'lucide-react';
import NotificationSettingsTab from '@/components/admin/NotificationSettingsTab';

export default function AdminNotificationsPage() {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  // Mock notification templates
  const templates = [
    {
      id: '1',
      name: 'Welcome Email',
      type: 'email',
      subject: 'Welcome to the MOH Innovation Platform',
      lastUpdated: '2023-04-10',
      active: true
    },
    {
      id: '2',
      name: 'Challenge Submission',
      type: 'email',
      subject: 'Your Challenge Submission Received',
      lastUpdated: '2023-04-05',
      active: true
    },
    {
      id: '3',
      name: 'Innovation Approved',
      type: 'email',
      subject: 'Congratulations! Your Innovation Has Been Approved',
      lastUpdated: '2023-03-28',
      active: true
    },
    {
      id: '4',
      name: 'New Investor Match',
      type: 'push',
      subject: 'New Investor Match For Your Innovation',
      lastUpdated: '2023-04-01',
      active: false
    }
  ];
  
  // Mock scheduled notifications
  const scheduledNotifications = [
    {
      id: '1',
      title: 'Challenge Deadline Reminder',
      recipients: 'All Challenge Participants',
      scheduledDate: '2023-05-15 09:00',
      type: 'email',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Platform Maintenance Notice',
      recipients: 'All Users',
      scheduledDate: '2023-05-10 18:00',
      type: 'system',
      status: 'scheduled'
    }
  ];

  return (
    <AdminLayout
      title="Notifications & Communication"
      description="Manage communications with platform users"
    >
      <Tabs defaultValue="send" className="space-y-6">
        <TabsList>
          <TabsTrigger value="send">Send Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send New Notification</CardTitle>
              <CardDescription>Communicate with platform users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notificationType">Notification Type</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-4 border rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                    <Mail className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 border rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                    <Smartphone className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium">Push</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 border rounded-md cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                    <Bell className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm font-medium">In-App</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientGroup">Recipients</Label>
                <Input id="recipientGroup" placeholder="Select recipient group or individuals" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationSubject">Subject</Label>
                <Input id="notificationSubject" placeholder="Notification subject" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationMessage">Message</Label>
                <Input id="notificationMessage" placeholder="Type your message here" className="h-24" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
          
          {templates.map(template => (
            <Card key={template.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>Subject: {template.subject}</CardDescription>
                  </div>
                  <Badge variant={template.type === 'email' ? 'default' : 'outline'}>
                    {template.type === 'email' ? (
                      <Mail className="h-3 w-3 mr-1" />
                    ) : (
                      <Bell className="h-3 w-3 mr-1" />
                    )}
                    {template.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Last updated:</span> {template.lastUpdated}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Active:</span>
                    <Switch checked={template.active} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Preview</Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Edit Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule New
            </Button>
          </div>
          
          {scheduledNotifications.length > 0 ? (
            <div className="space-y-4">
              {scheduledNotifications.map(notification => (
                <Card key={notification.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{notification.title}</CardTitle>
                        <CardDescription>Recipients: {notification.recipients}</CardDescription>
                      </div>
                      <Badge>
                        {notification.type === 'email' ? (
                          <Mail className="h-3 w-3 mr-1" />
                        ) : (
                          <Bell className="h-3 w-3 mr-1" />
                        )}
                        {notification.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Scheduled for:</span> {notification.scheduledDate}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Send Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10">
                <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No scheduled notifications</p>
                <Button>Schedule Notification</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <NotificationSettingsTab
            enableNotifications={enableNotifications}
            onToggleNotifications={() => setEnableNotifications(!enableNotifications)}
            onSave={handleSaveSettings}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
