
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SupportTicketForm from "@/components/support/SupportTicketForm";
import SupportChatInterface from "@/components/support/SupportChatInterface";
import SupportTicketsList from "@/components/support/SupportTicketsList";
import SupportFeedbackSummary from "@/components/support/SupportFeedbackSummary";
import SupportAnalytics from "@/components/support/SupportAnalytics";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SupportPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.user_metadata?.userType === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Support Center</h2>
        <p className="text-muted-foreground">
          Get support for your healthcare innovation journey
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">AI Support Chat</TabsTrigger>
          <TabsTrigger value="tickets">Submit Ticket</TabsTrigger>
          <TabsTrigger value="history">Ticket History</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          {isAdmin && <TabsTrigger value="analytics">Analytics</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Assistant</CardTitle>
              <CardDescription>
                Chat with our AI assistant to get instant help with common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupportChatInterface />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>
                Submit a detailed support request for our team to review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupportTicketForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Tickets</CardTitle>
              <CardDescription>
                Review the status and history of your support tickets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupportTicketsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Insights</CardTitle>
              <CardDescription>
                View analytics and insights from your support interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupportFeedbackSummary />
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Support Analytics</CardTitle>
                <CardDescription>
                  Advanced analytics and trends for support operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupportAnalytics />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
