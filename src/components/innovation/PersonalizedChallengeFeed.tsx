
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Star, Calendar, Users, Sparkles, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  organizer: string;
  end_date: string;
  image_url?: string;
  matching_score?: number; // For personalized recommendations
  matching_reason?: string;
  eligibility?: string;
}

// Mock data for demonstration purposes
// In a real implementation, this would be fetched from the API
const MOCK_CHALLENGES: Challenge[] = [
  {
    id: "ch-001",
    title: "AI-Powered Diagnostic Tool for Rural Areas",
    description: "Develop an AI solution that can diagnose common diseases with minimal equipment, suitable for deployment in rural healthcare facilities.",
    category: "Digital Health",
    organizer: "Ministry of Health",
    end_date: "2023-08-15",
    matching_score: 95,
    matching_reason: "Matches your expertise in AI and medical diagnostics",
    eligibility: "Open to all healthcare professionals and tech startups"
  },
  {
    id: "ch-002",
    title: "Remote Patient Monitoring System",
    description: "Create a solution for continuous monitoring of patients with chronic conditions while they are at home, with real-time data transmission to healthcare providers.",
    category: "Telehealth",
    organizer: "National Telehealth Initiative",
    end_date: "2023-09-30",
    matching_score: 87,
    matching_reason: "Aligns with your previous work in remote healthcare",
    eligibility: "Open to all"
  },
  {
    id: "ch-003",
    title: "Healthcare Data Interoperability Platform",
    description: "Build a platform that enables secure and standardized sharing of healthcare data between different systems, providers, and organizations.",
    category: "Healthcare IT",
    organizer: "Digital Health Coalition",
    end_date: "2023-10-15",
    matching_score: 82,
    matching_reason: "Relevant to your interest in healthcare data systems",
    eligibility: "Organizations with experience in healthcare IT"
  },
  {
    id: "ch-004",
    title: "Mental Health Digital Intervention",
    description: "Design a digital intervention that helps users manage stress, anxiety, and depression through evidence-based techniques and personalized recommendations.",
    category: "Mental Health",
    organizer: "Ministry of Health",
    end_date: "2023-11-20",
    matching_score: 79,
    matching_reason: "Related to your background in psychology and digital health",
    eligibility: "Open to startups and research institutions"
  },
  {
    id: "ch-005",
    title: "Accessible Telehealth Solution",
    description: "Develop a telehealth platform specifically designed to be accessible for elderly patients and people with disabilities.",
    category: "Telehealth",
    organizer: "Elderly Care Innovation Hub",
    end_date: "2023-09-10",
    matching_score: 75,
    matching_reason: "Matches your interest in accessibility and telehealth",
    eligibility: "Open to all"
  }
];

export function PersonalizedChallengeFeed() {
  const [activeTab, setActiveTab] = useState("for-you");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // In a real implementation, this would fetch challenges from an API
    // with personalized recommendations for the current user
    const fetchChallenges = async () => {
      try {
        setIsLoading(true);
        // Simulating API call with a timeout
        setTimeout(() => {
          setChallenges(MOCK_CHALLENGES);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        toast({
          title: "Error",
          description: "Failed to fetch challenges. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [toast]);

  // Get challenges for the active tab
  const getFilteredChallenges = () => {
    if (activeTab === "for-you") {
      return [...challenges].sort((a, b) => 
        (b.matching_score || 0) - (a.matching_score || 0)
      );
    } else if (activeTab === "ending-soon") {
      return [...challenges].sort((a, b) => 
        new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
      );
    } else {
      return challenges;
    }
  };

  // Format a date string to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Digital Health': 'bg-blue-100 text-blue-800',
      'Telehealth': 'bg-green-100 text-green-800',
      'Healthcare IT': 'bg-purple-100 text-purple-800',
      'Mental Health': 'bg-pink-100 text-pink-800',
      'Medical Devices': 'bg-amber-100 text-amber-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredChallenges = getFilteredChallenges();

  return (
    <Card className="border-moh-green/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-moh-green" />
          Personalized Challenge Feed
        </CardTitle>
        <CardDescription>
          Challenges selected for you based on your profile, interests, and expertise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="for-you" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="for-you" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">For You</span>
            </TabsTrigger>
            <TabsTrigger value="ending-soon" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Ending Soon</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you" className="pt-2">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ChallengeCard 
                      challenge={challenge} 
                      showMatchScore={activeTab === "for-you"} 
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="ending-soon" className="pt-2">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChallenges.map((challenge) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    showMatchScore={false} 
                    highlightEndDate 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="pt-2">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChallenges.map((challenge) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge} 
                    showMatchScore={false} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter Challenges
        </Button>
        <Button 
          className="bg-moh-green hover:bg-moh-darkGreen text-white"
          size="sm"
          asChild
        >
          <Link to="/challenges">View All Challenges</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface ChallengeCardProps {
  challenge: Challenge;
  showMatchScore?: boolean;
  highlightEndDate?: boolean;
}

function ChallengeCard({ challenge, showMatchScore = false, highlightEndDate = false }: ChallengeCardProps) {
  // Calculate days remaining until end date
  const daysRemaining = () => {
    const endDate = new Date(challenge.end_date);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date function (was missing)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get category color function (was missing)
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Digital Health': 'bg-blue-100 text-blue-800',
      'Telehealth': 'bg-green-100 text-green-800',
      'Healthcare IT': 'bg-purple-100 text-purple-800',
      'Mental Health': 'bg-pink-100 text-pink-800',
      'Medical Devices': 'bg-amber-100 text-amber-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="border rounded-lg p-4 hover:border-moh-green/40 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className={getCategoryColor(challenge.category)}>
              {challenge.category}
            </Badge>
            {showMatchScore && (
              <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen border-moh-green/30">
                {challenge.matching_score}% match
              </Badge>
            )}
            {highlightEndDate && daysRemaining() <= 10 && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                {daysRemaining()} days left
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg">{challenge.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{challenge.description}</p>
        </div>
      </div>
      
      {showMatchScore && challenge.matching_reason && (
        <div className="mt-2 bg-moh-lightGreen/20 p-2 rounded-md">
          <p className="text-xs text-moh-darkGreen">
            <Star className="h-3 w-3 inline mr-1" />
            {challenge.matching_reason}
          </p>
        </div>
      )}
      
      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Ends {formatDate(challenge.end_date)}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-3 w-3 mr-1" />
          <span>{challenge.organizer}</span>
        </div>
      </div>
      
      <div className="mt-3 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-moh-green hover:text-moh-darkGreen hover:bg-moh-lightGreen/20"
          asChild
        >
          <Link to={`/challenges/${challenge.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
