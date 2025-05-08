
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAllChallenges } from "@/services/challengeService";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { Challenge } from "@/types/challenges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, X } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { toast } from "@/hooks/use-toast";

export default function ChallengesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || undefined;
  const initialStatus = searchParams.get("status") || "all";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [activeTab, setActiveTab] = useState(initialStatus);

  // Fetch all challenges
  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ["challenges"],
    queryFn: () => getAllChallenges(),
  });

  // Apply local filtering
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    
    if (activeTab !== "all") {
      params.set("status", activeTab);
    }
    
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    
    setSearchParams(params);
    
  }, [selectedCategory, activeTab, setSearchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = [...challenges];
    
    // Apply status filter based on tab
    if (activeTab !== "all") {
      filtered = filtered.filter(challenge => 
        challenge.status.toLowerCase() === activeTab.toLowerCase()
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(challenge => 
        challenge.category === selectedCategory
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.title.toLowerCase().includes(query) || 
        challenge.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredChallenges(filtered);
    
    // Show notification when filters applied
    if (selectedCategory || activeTab !== "all" || searchQuery) {
      // We're commenting this out as it can get annoying if it shows too frequently
      // toast({
      //   title: "Filters applied",
      //   description: `Showing ${filtered.length} filtered results`,
      // });
    }
  }, [challenges, searchQuery, selectedCategory, activeTab]);

  // Extract unique categories
  const categories = [...new Set(challenges.map(challenge => challenge.category))];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled by the useEffect
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedCategory(undefined);
    setActiveTab("all");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Innovation Challenges</h1>
            <p className="text-muted-foreground">Discover and participate in healthcare innovation challenges across the Kingdom</p>
          </div>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6 items-end">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search challenges..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button"
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="w-full md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(selectedCategory || activeTab !== "all" || searchQuery) && (
              <Button 
                variant="ghost" 
                onClick={handleClearFilters}
                type="button"
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </form>

          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredChallenges.length === 0 ? (
            <div className="text-center py-12 bg-moh-lightGreen/30 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No challenges found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="border-moh-green text-moh-green hover:bg-moh-lightGreen"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
