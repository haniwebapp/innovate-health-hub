
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, Trophy, Clock, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Challenge } from "@/types/challenges";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import ChallengeHeader from "@/components/challenges/ChallengeHeader";
import ChallengeRequirements from "@/components/challenges/ChallengeRequirements";
import ChallengeTimeline from "@/components/challenges/ChallengeTimeline";
import { format, parseISO, isPast } from "date-fns";

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  // Fetch challenge details from Supabase
  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Parse requirements from JSON
      if (data && data.requirements) {
        try {
          if (typeof data.requirements === 'string') {
            data.requirements = JSON.parse(data.requirements);
          }
        } catch (e) {
          console.error('Error parsing requirements:', e);
          data.requirements = [];
        }
      }
      
      return data as Challenge;
    },
    enabled: !!id
  });

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return 'Date unavailable';
    }
  };
  
  const isDeadlinePassed = () => {
    if (!challenge?.end_date) return false;
    try {
      return isPast(parseISO(challenge.end_date));
    } catch (e) {
      return false;
    }
  };

  // Determine if the challenge can be submitted to
  const canApply = challenge && 
                  challenge.status === 'active' && 
                  !isDeadlinePassed();

  // Generate timeline from start and end dates
  const generateTimeline = (challenge: Challenge) => {
    if (!challenge) return [];
    
    return [
      { date: formatDate(challenge.start_date), event: "Challenge Launch" },
      { date: formatDate(challenge.end_date), event: "Submission Deadline" }
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16">
            <Skeleton className="w-full h-64 mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="w-3/4 h-12" />
              <Skeleton className="w-1/2 h-6" />
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="space-y-4">
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-64" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="w-full h-32" />
                  <Skeleton className="w-full h-64" />
                </div>
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
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Challenge Not Found</h1>
            <p className="text-gray-600 mb-8">
              The challenge you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/challenges">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Challenges
              </Link>
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
      
      <ChallengeHeader challenge={challenge} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav 
            items={[{ name: "Challenges", href: "/challenges" }]} 
            currentPage={challenge.title} 
          />
          
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details & Requirements</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold text-moh-darkGreen">Challenge Overview</h2>
                    <p>{challenge.description}</p>
                    
                    {challenge.long_description && (
                      <div className="mt-6">
                        <p>{challenge.long_description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-moh-green" />
                          Timeline
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-1">
                          <div>
                            <dt className="text-xs text-gray-500">Start Date</dt>
                            <dd className="font-medium">{formatDate(challenge.start_date)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Deadline</dt>
                            <dd className="font-medium">{formatDate(challenge.end_date)}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Trophy className="h-4 w-4 mr-2 text-moh-green" />
                          Reward
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">
                          {challenge.prize || "Recognition and implementation opportunity"}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Users className="h-4 w-4 mr-2 text-moh-green" />
                          Organizer
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-medium">{challenge.organizer}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-6">
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold text-moh-darkGreen">Challenge Details</h2>
                      <p>{challenge.description}</p>
                      
                      {challenge.long_description && (
                        <div className="mt-4">
                          <p>{challenge.long_description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-moh-darkGreen mb-4">Application Requirements</h3>
                      <ChallengeRequirements 
                        eligibility={challenge.eligibility || "Healthcare professionals and innovators"} 
                        requirements={challenge.requirements as string[] || []}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-moh-darkGreen">Challenge Timeline</h2>
                    <ChallengeTimeline timeline={generateTimeline(challenge)} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div className="w-full md:w-80 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h3 className="font-medium mb-1">Status</h3>
                    <Badge className="bg-moh-green">{challenge.status}</Badge>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-medium mb-1">Deadline</h3>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-moh-darkGreen" />
                      {formatDate(challenge.end_date)}
                    </div>
                  </div>
                  
                  {canApply ? (
                    <Button 
                      asChild 
                      className="w-full bg-moh-gold hover:bg-moh-darkGold text-white"
                    >
                      <Link to={user ? `/dashboard/submit/${challenge.id}` : "/auth"}>
                        Apply Now
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  ) : (
                    <div className="bg-gray-100 text-gray-700 py-3 px-4 rounded-md text-center text-sm">
                      {isDeadlinePassed() ? 
                        "This challenge is no longer accepting submissions" : 
                        "This challenge is not currently accepting submissions"
                      }
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Share This Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Copy Link
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
