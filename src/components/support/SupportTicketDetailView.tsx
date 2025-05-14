
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SupportTicket, SupportInteraction } from "@/types/supportTypes";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, Tag, Clock, Star, ThumbsUp, ThumbsDown } from "lucide-react";

interface SupportTicketDetailProps {
  ticketId: string;
  onClose: () => void;
}

export default function SupportTicketDetailView({ ticketId, onClose }: SupportTicketDetailProps) {
  const [ticket, setTicket] = useState<SupportTicket | null>(null);
  const [interactions, setInteractions] = useState<SupportInteraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    setIsLoading(true);
    try {
      // Fetch ticket details
      const { data: ticketData, error: ticketError } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('id', ticketId)
        .single();
      
      if (ticketError) throw ticketError;
      
      // Fetch ticket interactions
      const { data: interactionsData, error: interactionsError } = await supabase
        .from('support_interactions')
        .select('*')
        .eq('ticket_id', ticketId)
        .order('created_at', { ascending: true });
      
      if (interactionsError) throw interactionsError;
      
      // Cast the data to the correct types
      const typedTicket: SupportTicket = {
        ...ticketData,
        priority: ticketData.priority as 'low' | 'medium' | 'high' | 'critical',
        status: ticketData.status as 'open' | 'in-progress' | 'resolved' | 'closed',
      };
      
      const typedInteractions: SupportInteraction[] = interactionsData?.map(interaction => ({
        ...interaction,
        // Ensure metadata is properly handled
        metadata: interaction.metadata || {},
      })) || [];
      
      setTicket(typedTicket);
      setInteractions(typedInteractions);
    } catch (error: any) {
      console.error("Error fetching ticket details:", error);
      toast({
        variant: "destructive",
        title: "Failed to load ticket details",
        description: error.message || "Could not load ticket details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim() || !user) return;
    
    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('support_interactions')
        .insert({
          user_id: user.id,
          ticket_id: ticketId,
          response: newReply,
          interaction_type: 'user_reply',
          ai_generated: false
        });
      
      if (error) throw error;
      
      // Update ticket status if it's closed
      if (ticket?.status === 'closed') {
        await supabase
          .from('support_tickets')
          .update({ status: 'in-progress' })
          .eq('id', ticketId);
      }
      
      toast({
        title: "Reply sent",
        description: "Your reply has been added to the ticket.",
      });
      
      setNewReply("");
      fetchTicketDetails(); // Refresh data
    } catch (error: any) {
      console.error("Error submitting reply:", error);
      toast({
        variant: "destructive",
        title: "Failed to send reply",
        description: error.message || "Could not send your reply.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRateResponse = async (interactionId: string, helpful: boolean) => {
    try {
      const { error } = await supabase
        .from('support_interactions')
        .update({ feedback: helpful })
        .eq('id', interactionId);
      
      if (error) throw error;
      
      toast({
        title: "Feedback recorded",
        description: `You rated this response as ${helpful ? 'helpful' : 'not helpful'}.`,
      });
      
      fetchTicketDetails(); // Refresh data
    } catch (error: any) {
      console.error("Error rating response:", error);
      toast({
        variant: "destructive",
        title: "Failed to record feedback",
        description: error.message || "Could not save your feedback.",
      });
    }
  };

  const handleSatisfactionRating = async (rating: number) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ satisfaction_rating: rating })
        .eq('id', ticketId);
      
      if (error) throw error;
      
      toast({
        title: "Thank you for your feedback",
        description: "Your satisfaction rating has been recorded.",
      });
      
      fetchTicketDetails(); // Refresh data
    } catch (error: any) {
      console.error("Error saving satisfaction rating:", error);
      toast({
        variant: "destructive",
        title: "Failed to save rating",
        description: error.message || "Could not save your satisfaction rating.",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
        </CardContent>
      </Card>
    );
  }

  if (!ticket) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-red-500">Ticket not found</p>
            <Button onClick={onClose} className="mt-4">Go Back</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{ticket.subject}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge className="bg-slate-200 text-slate-700">ID: {ticket.id.substring(0, 8)}</Badge>
              <Badge className={
                ticket.status === 'open' ? "bg-green-100 text-green-700" :
                ticket.status === 'in-progress' ? "bg-blue-100 text-blue-700" :
                ticket.status === 'resolved' ? "bg-purple-100 text-purple-700" :
                "bg-slate-200 text-slate-700"
              }>
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </Badge>
              <Badge className={
                ticket.priority === 'low' ? "bg-slate-200 text-slate-700" :
                ticket.priority === 'medium' ? "bg-blue-100 text-blue-700" :
                ticket.priority === 'high' ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              }>
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
              </Badge>
            </CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>Back</Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Ticket details section */}
        <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
          <div className="flex items-center gap-2 mb-2 text-sm text-slate-600">
            <MessageSquare className="h-4 w-4" />
            <span className="font-medium">Description</span>
            <span className="text-xs ml-auto">Created: {formatDate(ticket.created_at)}</span>
          </div>
          <p className="whitespace-pre-wrap text-slate-800">{ticket.description}</p>
          
          {/* Tags section */}
          {ticket.tags && ticket.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="flex items-center text-xs text-slate-600">
                <Tag className="h-3 w-3 mr-1" /> Tags:
              </span>
              {ticket.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-slate-100">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Response time */}
          {ticket.response_time_minutes !== null && ticket.response_time_minutes !== undefined && (
            <div className="mt-3 flex items-center text-xs text-slate-600">
              <Clock className="h-3 w-3 mr-1" />
              <span>Response time: {ticket.response_time_minutes} minutes</span>
            </div>
          )}
          
          {/* Additional info */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>Category: <span className="font-medium">{ticket.category}</span></div>
            {ticket.assigned_team && <div>Team: <span className="font-medium">{ticket.assigned_team}</span></div>}
          </div>
        </div>
        
        {/* Interactions section */}
        <div className="space-y-4 mt-6">
          <h3 className="text-lg font-semibold">Conversations</h3>
          
          {interactions.length > 0 ? (
            <div className="space-y-4">
              {interactions.map((interaction) => (
                <div 
                  key={interaction.id} 
                  className={`p-4 rounded-md border ${
                    interaction.user_id === user?.id 
                      ? "border-blue-100 bg-blue-50"
                      : "border-slate-100 bg-white"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {interaction.user_id === user?.id ? "ME" : "SP"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {interaction.user_id === user?.id ? "You" : "Support Agent"}
                        {interaction.ai_generated && " (AI)"}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {formatDate(interaction.created_at)}
                    </span>
                  </div>
                  
                  <div className="whitespace-pre-wrap">{interaction.response || interaction.query}</div>
                  
                  {/* Interaction tags */}
                  {interaction.tags && interaction.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {interaction.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-slate-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Feedback buttons */}
                  {interaction.user_id !== user?.id && (
                    <div className="mt-3 flex items-center gap-4">
                      <span className="text-xs text-slate-600">Was this helpful?</span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant={interaction.feedback === true ? "default" : "outline"}
                          className={interaction.feedback === true ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
                          onClick={() => handleRateResponse(interaction.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" /> Yes
                        </Button>
                        <Button 
                          size="sm" 
                          variant={interaction.feedback === false ? "default" : "outline"}
                          className={interaction.feedback === false ? "bg-red-100 text-red-700 hover:bg-red-200" : ""}
                          onClick={() => handleRateResponse(interaction.id, false)}
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" /> No
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-slate-50 rounded-md">
              <p className="text-slate-600">No interactions yet.</p>
            </div>
          )}
        </div>
        
        {/* Reply section */}
        {ticket.status !== 'closed' && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Add Reply</h3>
            <textarea
              className="w-full p-3 border border-slate-300 rounded-md min-h-[100px]"
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Type your reply here..."
            ></textarea>
            <Button 
              className="mt-2" 
              disabled={!newReply.trim() || submitting}
              onClick={handleSubmitReply}
            >
              {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Submit Reply
            </Button>
          </div>
        )}
        
        {/* Satisfaction rating section */}
        {(ticket.status === 'resolved' || ticket.status === 'closed') && (
          <div className="mt-6 bg-slate-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Rate your satisfaction</h3>
            <p className="text-sm text-slate-600 mb-3">How satisfied are you with the resolution of this ticket?</p>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant="outline"
                  className={`px-3 ${ticket.satisfaction_rating === rating ? 'bg-yellow-100 border-yellow-400' : ''}`}
                  onClick={() => handleSatisfactionRating(rating)}
                >
                  <Star 
                    className={`h-5 w-5 ${ticket.satisfaction_rating && rating <= ticket.satisfaction_rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} 
                  />
                </Button>
              ))}
            </div>
            
            {ticket.satisfaction_rating && (
              <p className="text-sm mt-2 text-green-600">
                Thank you for your rating of {ticket.satisfaction_rating} stars!
              </p>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>Close</Button>
      </CardFooter>
    </Card>
  );
}
