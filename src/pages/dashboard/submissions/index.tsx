import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Eye, Clock, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Submission } from "@/types/challenges";

// Mock submissions data with corrected status values and added description field
const mockSubmissions: Submission[] = [
  {
    id: "1",
    title: "HealthMonitor: Remote Patient Tracker",
    description: "A comprehensive solution for monitoring patients remotely",
    challenge_id: "1",
    challenge_title: "Remote Patient Monitoring Solutions",
    status: "under-review",
    submitted_at: "2025-05-01T14:30:00",
    updated_at: "2025-05-01T14:30:00",
    category: "Digital Health",
  },
  {
    id: "2",
    title: "MedSupply Chain Optimizer",
    description: "Optimizing healthcare supply chain logistics",
    challenge_id: "3",
    challenge_title: "Healthcare Supply Chain Optimization",
    status: "draft",
    submitted_at: "",
    updated_at: "2025-04-28T10:15:00",
    category: "Logistics",
  },
  {
    id: "3",
    title: "AI Disease Detection Framework",
    description: "Advanced AI algorithms for early disease detection",
    challenge_id: "2",
    challenge_title: "AI for Early Disease Detection",
    status: "submitted",
    submitted_at: "2025-04-15T09:45:00",
    updated_at: "2025-04-15T09:45:00",
    category: "AI & Machine Learning",
  }
];

// Submission card component with type fixes
const SubmissionCard = ({ submission }: { submission: Submission }) => {
  // Get status color with display-friendly status text mapping
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'draft': 'bg-amber-100 text-amber-800 hover:bg-amber-200',
      'submitted': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'under-review': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'completed': 'bg-green-100 text-green-800 hover:bg-green-200',
      'rejected': 'bg-red-100 text-red-800 hover:bg-red-200',
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  // Map internal status values to display-friendly text
  const getStatusDisplay = (status: string): string => {
    const statusDisplay: Record<string, string> = {
      'draft': 'Draft',
      'submitted': 'Submitted',
      'under-review': 'Under Review',
      'completed': 'Completed',
      'rejected': 'Rejected'
    };
    return statusDisplay[status] || status;
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(submission.status)}>
            {getStatusDisplay(submission.status)}
          </Badge>
          <Badge variant="outline" className="bg-moh-lightGreen/50 text-moh-darkGreen border-none">
            {submission.category}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{submission.title}</CardTitle>
        <CardDescription className="text-sm">{submission.challenge_title}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {submission.submitted_at ? (
            <span>Submitted on {format(new Date(submission.submitted_at), 'MMM d, yyyy')}</span>
          ) : (
            <span>Last updated on {format(new Date(submission.updated_at), 'MMM d, yyyy')}</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          {submission.status === "draft" ? (
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link to={`/dashboard/submissions/edit/${submission.id}`}>
                  Continue Editing
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to={`/dashboard/submissions/${submission.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
            </div>
          ) : (
            <Button variant="outline" asChild className="w-full">
              <Link to={`/dashboard/submissions/${submission.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Submission
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default function SubmissionsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Fetch user's submissions with proper typing
  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ['user-submissions', user?.id],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase
      //   .from('submissions')
      //   .select('*, challenges(title, category)')
      //   .eq('user_id', user?.id);
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise<Submission[]>(resolve => {
        setTimeout(() => resolve(mockSubmissions), 1000);
      });
    },
    enabled: !!user?.id
  });
  
  // Filter submissions based on status and search, with status mapping
  const filteredSubmissions = submissions?.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.challenge_title.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesStatus = statusFilter === "all" || submission.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Count submissions by status
  const submissionCounts = {
    all: submissions?.length || 0,
    draft: submissions?.filter(s => s.status.toLowerCase() === 'draft').length || 0,
    submitted: submissions?.filter(s => ['submitted', 'under-review', 'completed'].includes(s.status.toLowerCase())).length || 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground">
            Manage and track your challenge submissions
          </p>
        </div>
        
        <Button asChild>
          <Link to="/challenges">
            <Plus className="h-4 w-4 mr-2" />
            Apply to a Challenge
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search submissions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
            All ({submissionCounts.all})
          </TabsTrigger>
          <TabsTrigger value="draft" onClick={() => setStatusFilter("draft")}>
            Drafts ({submissionCounts.draft})
          </TabsTrigger>
          <TabsTrigger value="submitted" onClick={() => setStatusFilter('submitted')}>
            Submitted ({submissionCounts.submitted})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 border-4 border-moh-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading your submissions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">Failed to load submissions. Please try again.</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : filteredSubmissions?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg mb-4">No submissions found.</p>
              <Button asChild>
                <Link to="/challenges">Browse Challenges</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubmissions?.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="draft" className="mt-6">
          {/* Content shown when Drafts tab is active */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 border-4 border-moh-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading drafts...</p>
            </div>
          ) : filteredSubmissions?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg mb-4">You don't have any draft submissions.</p>
              <Button asChild>
                <Link to="/challenges">Apply to a Challenge</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubmissions?.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="submitted" className="mt-6">
          {/* Content shown when Submitted tab is active */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="w-10 h-10 border-4 border-moh-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading submitted entries...</p>
            </div>
          ) : filteredSubmissions?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg mb-4">You don't have any submitted entries yet.</p>
              <Button asChild>
                <Link to="/challenges">Apply to a Challenge</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubmissions?.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
