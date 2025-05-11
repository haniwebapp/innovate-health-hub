
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellPlus, BellOff, Trash2, Calendar, FileEdit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createNotification } from "@/utils/notificationUtils";
import { useAuth } from "@/contexts/AuthContext";

interface NotificationSubscription {
  id: string;
  documentId: string;
  documentName: string;
  notifyOnChanges: boolean;
  notifyOnDeadlines: boolean;
  createdAt: Date;
}

export function DocumentChangeNotifier() {
  const [subscriptions, setSubscriptions] = useState<NotificationSubscription[]>([]);
  const [documentName, setDocumentName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [notifyChanges, setNotifyChanges] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleAddSubscription = () => {
    if (!documentId.trim() || !documentName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both document ID and name",
      });
      return;
    }
    
    const newSubscription: NotificationSubscription = {
      id: crypto.randomUUID(),
      documentId,
      documentName,
      notifyOnChanges: notifyChanges,
      notifyOnDeadlines: notifyDeadlines,
      createdAt: new Date(),
    };
    
    setSubscriptions([...subscriptions, newSubscription]);
    setDocumentId("");
    setDocumentName("");
    
    // In a real implementation, this would be stored in the database
    // For now, we'll simulate a successful subscription with a toast notification
    toast({
      title: "Subscription added",
      description: `You will be notified of changes to "${documentName}"`,
    });
    
    // Simulating backend notification creation
    if (user) {
      createNotification(
        user.id,
        "Notification Subscription Created",
        `You will now receive updates about "${documentName}"`,
        "policy"
      ).catch(console.error);
    }
  };
  
  const handleRemoveSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    
    toast({
      title: "Subscription removed",
      description: "You will no longer receive notifications for this document",
    });
  };
  
  const handleToggleNotification = (id: string, type: 'changes' | 'deadlines', value: boolean) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === id) {
        if (type === 'changes') {
          return { ...sub, notifyOnChanges: value };
        } else {
          return { ...sub, notifyOnDeadlines: value };
        }
      }
      return sub;
    }));
  };
  
  // For demo purposes only - simulate a document change notification
  const simulateNotification = async (subscription: NotificationSubscription) => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("User not authenticated");
      
      await createNotification(
        user.id,
        "Policy Update Notification",
        `The document "${subscription.documentName}" has been updated with new content.`,
        "policy_update",
        "/dashboard/policy"
      );
      
      toast({
        title: "Notification sent",
        description: "A simulated update notification has been sent",
      });
    } catch (error) {
      console.error("Failed to simulate notification:", error);
      toast({
        variant: "destructive",
        title: "Failed to send notification",
        description: "An error occurred while sending the notification",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-moh-green" />
          Policy Document Notifications
        </CardTitle>
        <CardDescription>
          Subscribe to be notified when policy documents are updated or when important deadlines approach
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="documentId">Document ID</Label>
              <Input
                id="documentId"
                placeholder="Enter document ID or reference"
                value={documentId}
                onChange={(e) => setDocumentId(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="documentName">Document Name</Label>
              <Input
                id="documentName"
                placeholder="Enter document name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="notifyChanges"
                checked={notifyChanges}
                onCheckedChange={setNotifyChanges}
              />
              <Label htmlFor="notifyChanges">Notify on changes</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="notifyDeadlines"
                checked={notifyDeadlines}
                onCheckedChange={setNotifyDeadlines}
              />
              <Label htmlFor="notifyDeadlines">Notify on deadlines</Label>
            </div>
          </div>
          
          <Button onClick={handleAddSubscription} className="w-full">
            <BellPlus className="h-4 w-4 mr-2" />
            Add Notification Subscription
          </Button>
        </div>
        
        {subscriptions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Your Subscriptions</h3>
            
            <div className="space-y-2">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id} className="bg-muted/40">
                  <CardHeader className="py-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{subscription.documentName}</CardTitle>
                        <CardDescription>ID: {subscription.documentId}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {subscription.notifyOnChanges && (
                          <Badge variant="outline" className="bg-moh-lightGreen/20">
                            <FileEdit className="h-3 w-3 mr-1" />
                            Changes
                          </Badge>
                        )}
                        {subscription.notifyOnDeadlines && (
                          <Badge variant="outline" className="bg-moh-lightGreen/20">
                            <Calendar className="h-3 w-3 mr-1" />
                            Deadlines
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`changes-${subscription.id}`}
                          checked={subscription.notifyOnChanges}
                          onCheckedChange={(value) => handleToggleNotification(subscription.id, 'changes', value)}
                        />
                        <Label htmlFor={`changes-${subscription.id}`} className="text-sm">Changes</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`deadlines-${subscription.id}`}
                          checked={subscription.notifyOnDeadlines}
                          onCheckedChange={(value) => handleToggleNotification(subscription.id, 'deadlines', value)}
                        />
                        <Label htmlFor={`deadlines-${subscription.id}`} className="text-sm">Deadlines</Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="py-3 flex justify-between">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => simulateNotification(subscription)}
                      disabled={isLoading}
                    >
                      Test Notification
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveSubscription(subscription.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
