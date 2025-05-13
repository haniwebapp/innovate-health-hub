import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { recordUserActivity } from "@/utils/activityUtils";

import ChallengesList from "@/components/challenges/dashboard/ChallengesList";
import ChallengeFilters from "@/components/challenges/dashboard/ChallengeFilters";
import ChallengeSearchBar from "@/components/challenges/dashboard/ChallengeSearchBar";
import EmptyState from "@/components/challenges/dashboard/EmptyState";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb } from "lucide-react";
import { Challenge } from "@/types/challenges";

// Helper function to format dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function DashboardChallengesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Fetch challenges from API
  const { data: challengesData, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('challenges')
          .select('*')
          .eq('status', 'Open');
          
        if (error) throw error;
        
        // Transform the data to match the Challenge interface
        const challenges = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          long_description: item.long_description || "",
          deadline: formatDate(item.end_date), // Format the end_date as deadline
          submission_deadline: item.end_date, // Use end_date for submission_deadline
          category: item.category,
          participants: Math.floor(Math.random() * 50) + 10, // Mock data for participants count
          prize: item.prize || "Prize to be announced",
          image_url: item.image_url || "",
          organizer: item.organizer,
          status: item.status as Challenge['status'], // Cast to allowed status type
          eligibility: item.eligibility || "",
          requirements: Array.isArray(item.requirements) 
            ? (item.requirements as string[]) 
            : [],
          timeline: [
            { date: formatDate(item.start_date), event: "Challenge Launch" },
            { date: formatDate(item.end_date), event: "Submission Deadline" }
          ]
        })) as Challenge[];
        
        return challenges;
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
        return data;
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
  const categories = challengesData
    ? ['All Categories', ...new Set(challengesData.map(c => c.category))]
    : ['All Categories'];

  // Map submissions to their challenges for easier lookup
  const submissionsByChallengeId = submissions?.reduce((acc, submission) => {
    acc[submission.challenge_id] = submission;
    return acc;
  }, {} as Record<string, any>) || {};

  // Filter challenges based on search, category, and status
  const filteredChallenges = challengesData?.filter(challenge => {
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
        <ChallengeFilters 
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          handleResetFilters={handleResetFilters}
        />

        <ChallengeSearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <TabsContent value="all" className="m-0">
          <ChallengesList 
            challenges={filteredChallenges}
            submissions={submissionsByChallengeId}
            isLoading={isLoadingChallenges || isLoadingSubmissions}
            emptyState={
              <EmptyState 
                icon="search"
                title="No challenges found"
                description="We couldn't find any challenges matching your search criteria."
                buttonText="Reset filters"
                onButtonClick={handleResetFilters}
              />
            }
          />
        </TabsContent>
        
        <TabsContent value="submitted" className="m-0">
          <ChallengesList 
            challenges={filteredChallenges?.filter(c => submissionsByChallengeId[c.id])}
            submissions={submissionsByChallengeId}
            isLoading={isLoadingChallenges || isLoadingSubmissions}
            emptyState={
              <EmptyState 
                icon="trophy"
                title="No submissions yet"
                description="You haven't submitted any solutions to challenges yet."
                buttonText="Browse Challenges"
                onButtonClick={() => {}}
                buttonLink="/challenges"
              />
            }
          />
        </TabsContent>
        
        <TabsContent value="not-submitted" className="m-0">
          <ChallengesList 
            challenges={filteredChallenges?.filter(c => !submissionsByChallengeId[c.id])}
            submissions={submissionsByChallengeId}
            isLoading={isLoadingChallenges || isLoadingSubmissions}
            emptyState={
              <EmptyState 
                icon="check"
                title="All caught up!"
                description="You've submitted solutions to all available challenges."
                buttonText="Discover More Challenges"
                onButtonClick={() => {}}
                buttonLink="/challenges"
              />
            }
          />
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
