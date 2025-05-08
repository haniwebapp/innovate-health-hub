
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserSubmissions } from "@/services/submissionService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, CalendarClock, Trophy, ExternalLink } from "lucide-react";
import { Submission, SubmissionStatus } from "@/types/challenges";

export default function SubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: getUserSubmissions,
  });

  // Filter submissions based on search and status
  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch = searchQuery === "" || 
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.challenge_title.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = activeTab === "all" || submission.status === activeTab;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-500";
      case "submitted":
        return "bg-blue-100 text-blue-600";
      case "under_review":
        return "bg-yellow-100 text-yellow-600";
      case "approved":
        return "bg-green-100 text-green-600";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground">
            Manage your challenge submissions and track their status
          </p>
        </div>
        <Button className="bg-moh-green hover:bg-moh-darkGreen">
          <Link to="/challenges">Find New Challenges</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 max-w-lg">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="under_review">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 rounded-lg bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="py-10">
                <div className="text-center">
                  <h3 className="text-xl font-medium">No submissions found</h3>
                  <p className="text-muted-foreground mt-2">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : activeTab !== "all"
                      ? `You don't have any ${activeTab} submissions`
                      : "You haven't submitted any challenges yet"}
                  </p>
                  {!searchQuery && activeTab === "all" && (
                    <Button className="mt-4 bg-moh-green hover:bg-moh-darkGreen">
                      <Link to="/challenges">Browse Challenges</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-grow p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status.replace("_", " ")}
                          </Badge>
                          <Badge variant="outline">{submission.category}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarClock className="h-4 w-4 mr-1" />
                          {submission.submitted_at 
                            ? `Submitted on ${new Date(submission.submitted_at).toLocaleDateString()}` 
                            : "Not submitted yet"}
                        </div>
                      </div>
                      <h3 className="text-lg font-medium">{submission.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        For: {submission.challenge_title}
                      </p>
                      {submission.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {submission.description}
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <Button variant="outline" asChild>
                          <Link to={`/challenges/${submission.challenge_id}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Challenge
                          </Link>
                        </Button>
                        {submission.status === "draft" && (
                          <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                            <Link to={`/dashboard/submit/${submission.challenge_id}`}>
                              Edit Submission
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                    {submission.status === "approved" && (
                      <div className="bg-green-50 flex items-center justify-center px-6 py-4 md:w-48">
                        <div className="text-center">
                          <Trophy className="h-10 w-10 mx-auto text-moh-gold mb-2" />
                          <p className="text-sm font-medium text-green-800">
                            Submission Approved
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
