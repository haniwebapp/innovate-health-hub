
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Challenge, Submission } from "@/types/challenges";
import { recordUserActivity } from "@/utils/activityUtils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Check,
  Clock,
  Filter,
  Lightbulb,
  Search,
  Trophy,
  CalendarClock,
  Users
} from "lucide-react";

// Helper function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Helper function to get status badge color
const getStatusBadgeColor = (status: string) => {
  const colors = {
    'Open': 'bg-green-100 text-green-800 border-green-200',
    'Closed': 'bg-red-100 text-red-800 border-red-200',
    'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
    'Submitted': 'bg-amber-100 text-amber-800 border-amber-200',
    'Draft': 'bg-slate-100 text-slate-800 border-slate-200',
    'Under Review': 'bg-purple-100 text-purple-800 border-purple-200',
    'Complete': 'bg-moh-green/20 text-moh-darkGreen border-moh-green/30',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Challenge Card Component
const ChallengeCard = ({ 
  challenge, 
  submission 
}: { 
  challenge: Challenge, 
  submission?: Submission 
}) => {
  const hasSubmission = !!submission;
  const submissionStatus = submission?.status || "";
  const submissionProgress = hasSubmission ? 
    (submissionStatus === "Complete" ? 100 : submissionStatus === "Submitted" ? 75 : 40) : 0;

  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-moh-green/10">
      <div className="h-40 overflow-hidden">
        <img 
          src={challenge.image_url || "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
          alt={challenge.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-moh-gold hover:bg-moh-darkGold">{challenge.category}</Badge>
          <div className="text-sm text-moh-darkGreen flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Deadline: {challenge.deadline}</span>
          </div>
        </div>
        <CardTitle className="text-xl text-moh-darkGreen mt-2 group-hover:text-moh-green transition-colors">
          {challenge.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{challenge.description}</p>
        
        {hasSubmission && (
          <>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
              <span>Submission Progress</span>
              <Badge className={getStatusBadgeColor(submissionStatus)}>
                {submissionStatus}
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-moh-green h-2 rounded-full" 
                style={{ width: `${submissionProgress}%` }}
              />
            </div>
          </>
        )}
        
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {challenge.participants || 0} Participants
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Prize: {challenge.prize}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        {hasSubmission ? (
          <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
            <Link to={`/dashboard/submissions/${submission.id}`}>
              View Submission
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        ) : (
          <Button asChild className="w-full border-moh-green text-moh-green hover:bg-moh-green/10 group">
            <Link to={`/dashboard/submit/${challenge.id}`}>
              Submit Solution
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Loading Skeleton Component
const ChallengeSkeleton = () => (
  <div className="h-full animate-pulse">
    <div className="h-40 bg-gray-200 rounded-t-lg"></div>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-7 w-full mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  </div>
);

export default function DashboardChallengesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Fetch challenges from API
  const { data: challenges, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('status', 'Open');
          
        if (error) throw error;
        return data as Challenge[];
      } catch (error) {
        console.error('Error fetching challenges:', error);
        
        // Fallback to mock data in case of error
        return mockChallenges;
      }
    }
  });

  // Fetch user submissions
  const { data: submissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['submissions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) throw error;
        return data as Submission[];
      } catch (error) {
        console.error('Error fetching submissions:', error);
        return [];
      }
    },
    enabled: !!user?.id
  });

  // Record activity when the page is loaded
  useEffect(() => {
    if (user?.id) {
      recordUserActivity('view', 'challenge', 'dashboard-challenges', {
        title: 'Dashboard Challenges',
        view_type: 'list'
      }).catch(console.error);
    }
  }, [user?.id]);

  // Get unique categories from challenges
  const categories = challenges
    ? ['All Categories', ...new Set(challenges.map(c => c.category))]
    : ['All Categories'];

  // Map submissions to their challenges for easier lookup
  const submissionsByChallengeId = submissions?.reduce((acc, submission) => {
    acc[submission.challenge_id] = submission;
    return acc;
  }, {} as Record<string, Submission>) || {};

  // Filter challenges based on search, category, and status
  const filteredChallenges = challenges?.filter(challenge => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "All Categories" || challenge.category === categoryFilter;
    
    const hasSubmission = !!submissionsByChallengeId[challenge.id];
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "submitted" && hasSubmission) || 
      (statusFilter === "not-submitted" && !hasSubmission);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("All Categories");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Innovation Challenges</h1>
          <p className="text-muted-foreground">
            Discover and participate in healthcare innovation challenges.
          </p>
        </div>
        <Button asChild className="bg-moh-green hover:bg-moh-darkGreen">
          <Link to="/dashboard/create-challenge">
            <Lightbulb className="mr-2 h-4 w-4" /> 
            Create Challenge
          </Link>
        </Button>
      </div>
      
      <Separator />

      <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value)}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Challenges</TabsTrigger>
            <TabsTrigger value="submitted">My Submissions</TabsTrigger>
            <TabsTrigger value="not-submitted">Not Submitted</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleResetFilters} size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search challenges by title or description..."
            className="pl-10 mb-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="m-0">
          {isLoadingChallenges || isLoadingSubmissions ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <ChallengeSkeleton key={index} />
              ))}
            </div>
          ) : filteredChallenges?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  submission={submissionsByChallengeId[challenge.id]}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
                <Search className="h-8 w-8 text-muted" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No challenges found</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                We couldn't find any challenges matching your search criteria.
              </p>
              <Button variant="outline" onClick={handleResetFilters}>
                Reset filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="submitted" className="m-0">
          {isLoadingChallenges || isLoadingSubmissions ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, index) => (
                <ChallengeSkeleton key={index} />
              ))}
            </div>
          ) : filteredChallenges?.filter(c => submissionsByChallengeId[c.id])?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges
                .filter(challenge => submissionsByChallengeId[challenge.id])
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    submission={submissionsByChallengeId[challenge.id]}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-muted" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No submissions yet</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                You haven't submitted any solutions to challenges yet.
              </p>
              <Button asChild>
                <Link to="/challenges">
                  Browse Challenges
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="not-submitted" className="m-0">
          {isLoadingChallenges || isLoadingSubmissions ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(3).fill(0).map((_, index) => (
                <ChallengeSkeleton key={index} />
              ))}
            </div>
          ) : filteredChallenges?.filter(c => !submissionsByChallengeId[c.id])?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges
                .filter(challenge => !submissionsByChallengeId[challenge.id])
                .map((challenge) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
                <Check className="h-8 w-8 text-muted" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">All caught up!</h3>
              <p className="text-muted-foreground mt-2 mb-4">
                You've submitted solutions to all available challenges.
              </p>
              <Button asChild>
                <Link to="/challenges">
                  Discover More Challenges
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock challenges data as fallback
const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    long_description: "Detailed description about the remote patient monitoring challenge and its objectives.",
    deadline: "June 30, 2025",
    submission_deadline: "2025-06-30T23:59:59+03:00",
    category: "Digital Health",
    participants: 47,
    prize: "SAR 500,000",
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Innovation Department",
    status: "Open",
    eligibility: "Healthcare professionals, technology innovators, startups",
    requirements: ["Solution must be applicable within Saudi healthcare system", "Technology must be tested for basic feasibility"],
    timeline: [
      { date: "March 15, 2025", event: "Challenge Launch" },
      { date: "June 30, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "2",
    title: "AI for Early Disease Detection",
    description: "Develop AI algorithms to detect early signs of diseases using existing health data from MOH facilities.",
    long_description: "Detailed description about the AI disease detection challenge and its objectives.",
    deadline: "July 15, 2025",
    submission_deadline: "2025-07-15T23:59:59+03:00",
    category: "AI & Machine Learning",
    participants: 32,
    prize: "SAR 750,000",
    image_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Digital Transformation Office",
    status: "Open",
    eligibility: "Data scientists, AI researchers, healthcare innovators",
    requirements: ["Must use anonymized healthcare data", "Solution must demonstrate significant improvement over existing methods"],
    timeline: [
      { date: "April 1, 2025", event: "Challenge Launch" },
      { date: "July 15, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "3",
    title: "Healthcare Supply Chain Optimization",
    description: "Create solutions to improve the efficiency and resilience of medical supply chains across Saudi Arabia.",
    long_description: "Detailed description about the supply chain optimization challenge and its objectives.",
    deadline: "August 22, 2025",
    submission_deadline: "2025-08-22T23:59:59+03:00",
    category: "Logistics",
    participants: 21,
    prize: "SAR 350,000",
    image_url: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Supply Chain Department",
    status: "Open",
    eligibility: "Supply chain experts, logistics companies, technology innovators",
    requirements: ["Solution must be implementable within 12 months", "Must demonstrate cost savings or efficiency gains"],
    timeline: [
      { date: "May 1, 2025", event: "Challenge Launch" },
      { date: "August 22, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "4",
    title: "Mental Health Support Platform",
    description: "Build a digital platform to provide mental health resources and support for citizens across the Kingdom.",
    long_description: "Detailed description about the mental health platform challenge and its objectives.",
    deadline: "September 10, 2025",
    submission_deadline: "2025-09-10T23:59:59+03:00",
    category: "Mental Health",
    participants: 39,
    prize: "SAR 600,000",
    image_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Mental Health Department",
    status: "Open",
    eligibility: "Mental health professionals, digital health startups, UX designers",
    requirements: ["Platform must be culturally sensitive", "Must include crisis intervention features"],
    timeline: [
      { date: "June 1, 2025", event: "Challenge Launch" },
      { date: "September 10, 2025", event: "Submission Deadline" }
    ]
  },
  {
    id: "5",
    title: "Elderly Care Innovations",
    description: "Develop technologies to support elderly care and independent living for seniors in Saudi Arabia.",
    long_description: "Detailed description about the elderly care innovation challenge and its objectives.",
    deadline: "October 5, 2025",
    submission_deadline: "2025-10-05T23:59:59+03:00",
    category: "Elder Care",
    participants: 27,
    prize: "SAR 450,000",
    image_url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Elderly Care Program",
    status: "Open",
    eligibility: "Geriatric care specialists, technology innovators, elderly care providers",
    requirements: ["Solution must be easy to use for elderly population", "Must enhance quality of life or independence"],
    timeline: [
      { date: "July 1, 2025", event: "Challenge Launch" },
      { date: "October 5, 2025", event: "Submission Deadline" }
    ]
  }
];
