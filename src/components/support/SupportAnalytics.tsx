
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { SupportAnalytic, SupportTicket } from "@/types/supportTypes";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, BarChart3, PieChart as PieChartIcon, Clock, ThumbsUp } from "lucide-react";

export default function SupportAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<SupportAnalytic[]>([]);
  const [ticketStats, setTicketStats] = useState({
    byCategory: [] as { name: string; value: number }[],
    byPriority: [] as { name: string; value: number }[],
    byStatus: [] as { name: string; value: number }[],
    responseTime: [] as { name: string; value: number }[],
    satisfaction: [] as { name: string; value: number }[]
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Fetch analytics data
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('support_analytics')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (analyticsError) throw analyticsError;
      
      // Fetch tickets for real-time analytics
      const { data: ticketsData, error: ticketsError } = await supabase
        .from('support_tickets')
        .select('*');
      
      if (ticketsError) throw ticketsError;
      
      setMetrics(analyticsData || []);
      
      // Process ticket data for charts
      if (ticketsData) {
        // Cast and transform the data to ensure it matches the SupportTicket type
        const typedTickets: SupportTicket[] = ticketsData.map(ticket => ({
          ...ticket,
          priority: ticket.priority as 'low' | 'medium' | 'high' | 'critical',
          status: ticket.status as 'open' | 'in-progress' | 'resolved' | 'closed',
          metadata: ticket.metadata || {}
        }));
        
        processTicketDataForCharts(typedTickets);
      }
    } catch (error: any) {
      console.error("Error fetching analytics data:", error);
      toast({
        variant: "destructive",
        title: "Failed to load analytics",
        description: error.message || "Could not load analytics data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const processTicketDataForCharts = (tickets: SupportTicket[]) => {
    // Process by category
    const categoryMap = new Map<string, number>();
    tickets.forEach(ticket => {
      const category = ticket.category || 'Uncategorized';
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
    
    // Process by priority
    const priorityMap = new Map<string, number>();
    tickets.forEach(ticket => {
      const priority = ticket.priority || 'Unspecified';
      priorityMap.set(priority, (priorityMap.get(priority) || 0) + 1);
    });
    
    // Process by status
    const statusMap = new Map<string, number>();
    tickets.forEach(ticket => {
      const status = ticket.status || 'Unspecified';
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });
    
    // Process response time
    const responseTimeBuckets = new Map<string, number>();
    tickets.forEach(ticket => {
      if (ticket.response_time_minutes) {
        let bucket: string;
        if (ticket.response_time_minutes < 30) bucket = '< 30 min';
        else if (ticket.response_time_minutes < 60) bucket = '30-60 min';
        else if (ticket.response_time_minutes < 240) bucket = '1-4 hours';
        else if (ticket.response_time_minutes < 1440) bucket = '4-24 hours';
        else bucket = '> 24 hours';
        
        responseTimeBuckets.set(bucket, (responseTimeBuckets.get(bucket) || 0) + 1);
      }
    });
    
    // Process satisfaction ratings
    const satisfactionMap = new Map<string, number>();
    tickets.forEach(ticket => {
      if (ticket.satisfaction_rating) {
        const rating = `${ticket.satisfaction_rating} Star${ticket.satisfaction_rating !== 1 ? 's' : ''}`;
        satisfactionMap.set(rating, (satisfactionMap.get(rating) || 0) + 1);
      }
    });
    
    // Convert maps to arrays for charts
    const byCategory = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));
    const byPriority = Array.from(priorityMap.entries()).map(([name, value]) => ({ name, value }));
    const byStatus = Array.from(statusMap.entries()).map(([name, value]) => ({ name, value }));
    const responseTime = Array.from(responseTimeBuckets.entries()).map(([name, value]) => ({ name, value }));
    const satisfaction = Array.from(satisfactionMap.entries()).map(([name, value]) => ({ name, value }));
    
    setTicketStats({
      byCategory,
      byPriority,
      byStatus,
      responseTime,
      satisfaction
    });
  };

  const CHART_COLORS = [
    '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', 
    '#d0ed57', '#ffc658', '#ff8042', '#ff6361', '#bc5090'
  ];

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Support Analytics Dashboard
          </CardTitle>
          <CardDescription>
            Key metrics and trends from your support system
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="response-times">Response Times</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tickets by Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketStats.byStatus}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {ticketStats.byStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} tickets`, 'Count']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tickets by Priority</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketStats.byPriority}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} tickets`, 'Count']} />
                    <Bar dataKey="value" fill="#8884d8">
                      {ticketStats.byPriority.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tickets by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketStats.byCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => [`${value} tickets`, 'Count']} />
                  <Bar dataKey="value" fill="#8884d8">
                    {ticketStats.byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Response Times Tab */}
        <TabsContent value="response-times" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Response Time Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketStats.responseTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} tickets`, 'Count']} />
                  <Bar dataKey="value" fill="#8884d8">
                    {ticketStats.responseTime.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Satisfaction Tab */}
        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2" />
                Customer Satisfaction Ratings
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ticketStats.satisfaction}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {ticketStats.satisfaction.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} ratings`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
