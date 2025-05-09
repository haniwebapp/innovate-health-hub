
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Challenge } from "@/types/challenges";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { format, parseISO } from "date-fns";

// Challenge Card Component
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-none animate-fade-in">
      <div className="h-40 overflow-hidden">
        <img 
          src={challenge.image_url || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'} 
          alt={challenge.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-moh-gold hover:bg-moh-darkGold">{challenge.category}</Badge>
          <div className="text-sm text-moh-darkGreen flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Deadline: {formatDate(challenge.end_date)}</span>
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
            {/* This would ideally come from a count of submissions */}
            Participants
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            {challenge.prize ? `Prize: ${challenge.prize}` : 'Recognition'}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
          <Link to={`/challenges/${challenge.id}`}>
            View Challenge
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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
  const [categories, setCategories] = useState<string[]>(["All Categories"]);
  
  // Fetch challenges from Supabase
  const { data: challenges, isLoading, error } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('status', 'active');  // Only show active challenges
      
      if (error) throw error;
      return data as Challenge[];
    }
  });

  // Extract unique categories once challenges are loaded
  useEffect(() => {
    if (challenges) {
      const uniqueCategories = [...new Set(challenges.map(c => c.category))];
      setCategories(["All Categories", ...uniqueCategories]);
    }
  }, [challenges]);
  
  // Filter challenges based on search and category
  const filteredChallenges = challenges?.filter(challenge => {
    const matchesSearch = 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "All Categories" || 
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
            {/* Breadcrumb Navigation */}
            <BreadcrumbNav currentPage="Challenges" />
            
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
