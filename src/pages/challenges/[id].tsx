import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Trophy, Share2, FileText, ArrowLeft, Building, Calendar as CalendarIcon } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for now
const mockChallenges = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    long_description: `
      <h3>Challenge Background</h3>
      <p>Saudi Arabia's geography presents unique challenges in healthcare delivery, with many communities living in remote areas far from major medical centers. Patients with chronic conditions in these areas often face difficulties accessing regular care and monitoring, leading to complications and preventable hospitalizations.</p>
      
      <h3>Challenge Objective</h3>
      <p>This challenge seeks innovative remote patient monitoring solutions that can bridge the geographical gap between healthcare providers and patients in remote areas of the Kingdom. The goal is to develop technologies that enable effective monitoring of chronic conditions, early intervention, and improved patient outcomes regardless of location.</p>
      
      <h3>What We're Looking For</h3>
      <ul>
        <li>Solutions that can function reliably in areas with limited connectivity</li>
        <li>User-friendly interfaces suitable for various demographics including elderly patients</li>
        <li>Integration capabilities with existing healthcare systems</li>
        <li>Secure handling of sensitive patient data</li>
        <li>Cost-effective implementation strategies</li>
        <li>Scalable approaches that can be deployed across diverse regions</li>
      </ul>
    `,
    deadline: "June 30, 2025",
    submission_deadline: "2025-06-30T23:59:59+03:00",
    category: "Digital Health",
    participants: 47,
    prize: "SAR 500,000",
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    organizer: "Ministry of Health - Innovation Department",
    status: "Open",
    eligibility: "Healthcare professionals, technology innovators, startups, and established companies in the healthcare and technology sectors.",
    requirements: [
      "Solution must be applicable within Saudi healthcare system",
      "Technology must be tested for basic feasibility",
      "Proposal must include implementation plan",
      "Solutions must adhere to data privacy regulations"
    ],
    timeline: [
      { date: "March 15, 2025", event: "Challenge Launch" },
      { date: "April 30, 2025", event: "Q&A Webinar" },
      { date: "June 30, 2025", event: "Submission Deadline" },
      { date: "July 30, 2025", event: "Finalists Announced" },
      { date: "September 15, 2025", event: "Final Presentations" },
      { date: "September 30, 2025", event: "Winners Announced" }
    ]
  },
  // ... other challenges
];

const ChallengeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch challenge details from API
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', id],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase
      //   .from('challenges')
      //   .select('*')
      //   .eq('id', id)
      //   .single();
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise((resolve) => {
        setTimeout(() => {
          const foundChallenge = mockChallenges.find(c => c.id === id);
          resolve(foundChallenge);
        }, 1000);
      });
    }
  });

  // Function to handle apply button click
  const handleApply = () => {
    if (!user) {
      // Redirect to login
      window.location.href = `/auth/login?redirect=/challenges/${id}`;
      return;
    }
    
    // Navigate to submission form
    window.location.href = `/dashboard/submit/${id}`;
  };
  
  // Calculate days remaining until deadline
  const getDaysRemaining = (deadlineDate: string) => {
    const deadline = new Date(deadlineDate);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-64 w-full bg-gray-200 animate-pulse rounded-lg mb-8"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/4 mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-8 w-48 mb-8" />
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
              </div>
              <div className="md:w-80">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Challenge Not Found</h1>
            <p className="text-gray-600 mb-8">The challenge you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/challenges">Back to Challenges</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src={challenge.image_url} 
            alt={challenge.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Link to="/challenges" className="inline-flex items-center text-white mb-4 hover:underline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Link>
              <Badge className="bg-moh-gold hover:bg-moh-darkGold mb-3">
                {challenge.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {challenge.title}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <Building className="h-4 w-4 mr-1" />
                <span>{challenge.organizer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: challenge.long_description }} />
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-moh-darkGreen">Eligibility</h3>
                    <p>{challenge.eligibility}</p>
                    
                    <h3 className="text-xl font-medium text-moh-darkGreen mt-6">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {challenge.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-6">
                  <div className="relative pl-8 border-l border-gray-200 space-y-8">
                    {challenge.timeline.map((event, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-11 mt-1.5 h-6 w-6 rounded-full border-4 border-white bg-moh-green flex items-center justify-center">
                          <CalendarIcon className="h-3 w-3 text-white" />
                        </div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-500">
                          {event.date}
                        </time>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.event}
                        </h3>
                        {index === challenge.timeline.length - 1 ? (
                          <p className="text-sm text-gray-600">Final winners will be announced and prizes awarded.</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="bg-white shadow-md rounded-lg border border-gray-100 p-6 sticky top-20">
                <div className="mb-6">
                  <span className="inline-flex gap-2 items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4" />
                    Submission Deadline
                  </span>
                  <p className="font-medium">{challenge.deadline}</p>
                </div>
                
                <div className="bg-moh-lightGreen/50 p-4 rounded-md mb-6">
                  <div className="text-center">
                    <span className="text-sm text-gray-600">Days Remaining</span>
                    <p className="text-2xl font-bold text-moh-green">
                      {getDaysRemaining(challenge.submission_deadline)}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <div>
                    <span className="inline-flex gap-1 items-center text-sm text-gray-500 mb-1">
                      <Trophy className="h-4 w-4" />
                      Prize
                    </span>
                    <p className="font-medium">{challenge.prize}</p>
                  </div>
                  <div>
                    <span className="inline-flex gap-1 items-center text-sm text-gray-500 mb-1">
                      <Users className="h-4 w-4" />
                      Participants
                    </span>
                    <p className="font-medium">{challenge.participants}</p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleApply}
                  className="w-full bg-moh-green hover:bg-moh-darkGreen text-white mb-4"
                >
                  Apply to Challenge
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Challenge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChallengeDetail;
