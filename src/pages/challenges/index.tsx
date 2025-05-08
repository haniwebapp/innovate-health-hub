
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllChallenges, searchChallenges } from "@/services/challengeService";
import ChallengeCard from "@/components/challenges/ChallengeCard";
import { Challenge } from "@/types/challenges";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState("all");

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ["challenges"],
    queryFn: getAllChallenges,
  });

  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);

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
  }, [challenges, searchQuery, selectedCategory, activeTab]);

  // Extract unique categories
  const categories = [...new Set(challenges.map(challenge => challenge.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-24 flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Innovation Challenges</h1>
            <p className="text-muted-foreground">Discover and participate in healthcare innovation challenges across the Kingdom</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search challenges..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
            {selectedCategory && (
              <Button variant="ghost" onClick={() => setSelectedCategory(undefined)}>
                Clear Filters
              </Button>
            )}
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
          </Tabs>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredChallenges.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No challenges found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
