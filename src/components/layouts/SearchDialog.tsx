
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Command, CommandGroup, CommandItem, CommandList, CommandInput } from "@/components/ui/command";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for search suggestions
const recentSearches = [
  "healthcare innovation",
  "medical device regulations",
  "digital health solutions",
  "funding opportunities"
];

const trendingSearches = [
  "artificial intelligence in healthcare",
  "telemedicine solutions",
  "remote monitoring devices",
  "preventive care innovations",
  "healthcare data analytics"
];

const popularCategories = [
  { name: "Medical Devices", path: "/innovations/medical-devices" },
  { name: "Digital Health", path: "/innovations/digital-health" },
  { name: "Pharmaceuticals", path: "/innovations/pharmaceuticals" },
  { name: "Regulatory", path: "/regulatory" },
  { name: "Challenges", path: "/challenges" },
  { name: "Investment", path: "/investment" },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        document.querySelector<HTMLInputElement>(".search-command-input")?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Here you would typically handle the search action
      // For now we'll just close the dialog
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 max-h-[85vh] overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Search className="h-5 w-5 text-moh-darkGreen absolute left-6" />
              <Command className="rounded-lg overflow-visible border-none shadow-none">
                <CommandInput
                  placeholder="Search for innovations, challenges, resources..."
                  className="search-command-input h-12 pl-8 text-lg"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
              </Command>
              <Button type="button" size="icon" variant="ghost" onClick={() => onOpenChange(false)}>
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <div className="px-4 border-b">
              <TabsList className="h-12">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="innovations">Innovations</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="overflow-y-auto flex-1 p-4">
              <TabsContent value="all" className="mt-0 space-y-6">
                {!searchQuery && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Trending Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="text-sm rounded-full"
                            onClick={() => setSearchQuery(search)}
                          >
                            {search}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Recent Searches
                      </h3>
                      <ul className="space-y-2">
                        {recentSearches.map((search, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <Button 
                              variant="ghost" 
                              className="text-gray-600 w-full justify-start px-2"
                              onClick={() => setSearchQuery(search)}
                            >
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              {search}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">
                        Popular Categories
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {popularCategories.map((category, index) => (
                          <Link 
                            key={index} 
                            to={category.path}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
                            onClick={() => onOpenChange(false)}
                          >
                            <span>{category.name}</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {searchQuery && (
                  <div className="py-4 text-center text-gray-500">
                    <p>Search results will appear here</p>
                    <p className="text-sm">Showing results for "{searchQuery}"</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="innovations" className="mt-0">
                <div className="py-4 text-center text-gray-500">
                  <p>Innovation search results will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="challenges" className="mt-0">
                <div className="py-4 text-center text-gray-500">
                  <p>Challenges search results will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="knowledge" className="mt-0">
                <div className="py-4 text-center text-gray-500">
                  <p>Knowledge resources search results will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="investment" className="mt-0">
                <div className="py-4 text-center text-gray-500">
                  <p>Investment search results will appear here</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
