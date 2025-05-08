
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, Users, Trophy, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface Challenge {
  id: string;
  title: string;
  description: string;
  deadline: string;
  category: string;
  participants: number;
  prize: string;
  image_url: string;
}

// Mock data for now - would be replaced by actual API call
const mockChallenges = [
  {
    id: "1",
    title: "Remote Patient Monitoring Solutions",
    description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
    deadline: "June 30, 2025",
    category: "Digital Health",
    participants: 47,
    prize: "SAR 500,000",
    image_url: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "AI for Early Disease Detection",
    description: "Develop AI algorithms to detect early signs of diseases using existing health data from MOH facilities.",
    deadline: "July 15, 2025",
    category: "AI & Machine Learning",
    participants: 32,
    prize: "SAR 750,000",
    image_url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Healthcare Supply Chain Optimization",
    description: "Create solutions to improve the efficiency and resilience of medical supply chains across Saudi Arabia.",
    deadline: "August 22, 2025",
    category: "Logistics",
    participants: 21,
    prize: "SAR 350,000",
    image_url: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Mental Health Support Platform",
    description: "Build a digital platform to provide mental health resources and support for citizens across the Kingdom.",
    deadline: "September 10, 2025",
    category: "Mental Health",
    participants: 39,
    prize: "SAR 600,000",
    image_url: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "Elderly Care Innovations",
    description: "Develop technologies to support elderly care and independent living for seniors in Saudi Arabia.",
    deadline: "October 5, 2025",
    category: "Elder Care",
    participants: 27,
    prize: "SAR 450,000",
    image_url: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "Vaccination Management System",
    description: "Create an innovative solution for nationwide vaccine distribution, administration, and monitoring.",
    deadline: "November 15, 2025",
    category: "Public Health",
    participants: 51,
    prize: "SAR 550,000",
    image_url: "https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Digital Health",
  "AI & Machine Learning",
  "Logistics",
  "Mental Health",
  "Elder Care",
  "Public Health"
];

// Challenge Card Component
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-none animate-fade-in">
      <div className="h-40 overflow-hidden">
        <img 
          src={challenge.image_url} 
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
        <p className="text-gray-600 mb-4">{challenge.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {challenge.participants} Participants
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Prize: {challenge.prize}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
          View Challenge
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
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

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  
  // Fetch challenges from API (using mock data for now)
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      // In a real app, this would be fetching from Supabase
      // const { data, error } = await supabase.from('challenges').select('*');
      // if (error) throw error;
      // return data;
      
      // Using mock data for now
      return new Promise<Challenge[]>((resolve) => {
        setTimeout(() => resolve(mockChallenges), 1000);
      });
    }
  });
  
  // Filter challenges based on search and category
  const filteredChallenges = challenges?.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All Categories" || 
                           challenge.category === categoryFilter;
                           
    return matchesSearch && matchesCategory;
  });

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All Categories");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 md:py-16 bg-moh-lightGreen/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen">
                Innovation Challenges
              </h1>
              <p className="text-lg text-gray-700">
                Join MOH-sponsored challenges to solve critical healthcare issues and 
                help shape the future of healthcare in Saudi Arabia.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
              <div className="flex-1">
                <h2 className="text-lg font-medium mb-2">Search Challenges</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search by keywords..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <h2 className="text-lg font-medium mb-2">Filter by Category</h2>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
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
              </div>
              <Button variant="outline" onClick={handleResetFilters} className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
            
            {/* Results count and sorting */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {isLoading ? (
                  "Loading challenges..."
                ) : error ? (
                  "Error loading challenges"
                ) : (
                  `Showing ${filteredChallenges?.length || 0} challenges`
                )}
              </p>
            </div>
            
            {/* Challenge grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                // Loading skeletons
                Array(6).fill(0).map((_, index) => (
                  <ChallengeSkeleton key={index} />
                ))
              ) : error ? (
                <div className="col-span-full text-center p-8">
                  <p className="text-red-500 font-medium">Failed to load challenges. Please try again later.</p>
                  <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                </div>
              ) : filteredChallenges?.length === 0 ? (
                <div className="col-span-full text-center p-8">
                  <p className="font-medium text-lg">No challenges found matching your search criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredChallenges?.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
