
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, MessageSquare, AlertTriangle, Clock, Tag, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { SupportTicket } from "@/types/supportTypes";
import SupportTicketDetailView from "./SupportTicketDetailView";

export default function SupportTicketsList() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"open" | "resolved" | "all">("open");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, [activeFilter, priorityFilter, user]);

  const fetchTickets = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      let query = supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      // Add status filter if not showing all
      if (activeFilter === "open") {
        query = query.in('status', ['open', 'in-progress']);
      } else if (activeFilter === "resolved") {
        query = query.in('status', ['resolved', 'closed']);
      }
      
      // Add priority filter if not showing all
      if (priorityFilter !== "all") {
        query = query.eq('priority', priorityFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        // Cast and transform the data to ensure it matches the SupportTicket type
        const typedTickets: SupportTicket[] = data.map(ticket => ({
          ...ticket,
          priority: ticket.priority as 'low' | 'medium' | 'high' | 'critical',
          status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
        }));
        setTickets(typedTickets);
      }
    } catch (error: any) {
      console.error("Error fetching tickets:", error);
      toast({
        variant: "destructive",
        title: "Failed to load tickets",
        description: error.message || "Could not load your support tickets.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-slate-200 text-slate-700";
      case "medium": return "bg-blue-100 text-blue-700";
      case "high": return "bg-amber-100 text-amber-700";
      case "critical": return "bg-red-100 text-red-700";
      default: return "bg-slate-200 text-slate-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700";
      case "in-progress": return "bg-blue-100 text-blue-700";
      case "resolved": return "bg-purple-100 text-purple-700";
      case "closed": return "bg-slate-200 text-slate-700";
      default: return "bg-slate-200 text-slate-700";
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

  const handleTicketClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  const handleCloseDetail = () => {
    setSelectedTicketId(null);
    fetchTickets(); // Refresh the list to show any updates
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      ticket.subject.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query) ||
      (ticket.tags && ticket.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  if (!user) {
    return (
      <Card className="bg-slate-50">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-slate-600">
            Please log in to view your support tickets history.
          </p>
        </CardContent>
      </Card>
    );
  }

  // If a ticket is selected, show the detail view
  if (selectedTicketId) {
    return <SupportTicketDetailView ticketId={selectedTicketId} onClose={handleCloseDetail} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Tabs defaultValue={activeFilter} onValueChange={(value) => setActiveFilter(value as any)}>
          <TabsList>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search tickets..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
        </div>
      ) : filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card key={ticket.id} className="cursor-pointer hover:border-slate-400 transition-colors" onClick={() => handleTicketClick(ticket.id)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="outline">{ticket.category}</Badge>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {formatDate(ticket.created_at)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-slate-600 whitespace-pre-wrap line-clamp-3">
                  {ticket.description}
                </div>
                
                {/* Tags display */}
                {ticket.tags && ticket.tags.length > 0 && (
                  <div className="mt-3 flex items-center flex-wrap gap-2">
                    <span className="flex items-center text-xs text-slate-500">
                      <Tag className="h-3 w-3 mr-1" /> Tags:
                    </span>
                    {ticket.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {ticket.initial_response && (
                  <div className="mt-3 bg-slate-50 p-3 rounded-md border border-slate-200">
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-600 mb-1">
                      <MessageSquare className="h-3 w-3" />
                      Initial Response
                    </div>
                    <div className="text-sm text-slate-600 line-clamp-2">
                      {ticket.initial_response}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Badge>
                <Button variant="ghost" size="sm">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-50">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tickets found</h3>
            <p className="text-slate-600">
              {searchQuery 
                ? "No tickets match your search criteria."
                : activeFilter === "open" 
                  ? "You don't have any open support tickets." 
                  : activeFilter === "resolved"
                  ? "You don't have any resolved support tickets."
                  : "You haven't submitted any support tickets yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
