import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, TrendingUp, Clock, ArrowRight, Hash, MapPin, FileText, Book, Calendar, Users, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Command, CommandGroup, CommandItem, CommandList, CommandInput, CommandEmpty } from "@/components/ui/command";
import { motion, AnimatePresence } from "framer-motion";

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
  { term: "artificial intelligence in healthcare", icon: <Star className="h-4 w-4 text-amber-500" /> },
  { term: "telemedicine solutions", icon: <Users className="h-4 w-4 text-blue-500" /> },
  { term: "remote monitoring devices", icon: <MapPin className="h-4 w-4 text-red-500" /> },
  { term: "preventive care innovations", icon: <FileText className="h-4 w-4 text-green-500" /> },
  { term: "healthcare data analytics", icon: <TrendingUp className="h-4 w-4 text-purple-500" /> }
];

const popularCategories = [
  { name: "Medical Devices", path: "/innovations/medical-devices", icon: <Hash className="h-5 w-5 text-blue-500" /> },
  { name: "Digital Health", path: "/innovations/digital-health", icon: <Hash className="h-5 w-5 text-green-500" /> },
  { name: "Pharmaceuticals", path: "/innovations/pharmaceuticals", icon: <Hash className="h-5 w-5 text-amber-500" /> },
  { name: "Regulatory", path: "/regulatory", icon: <FileText className="h-5 w-5 text-red-500" /> },
  { name: "Challenges", path: "/challenges", icon: <Star className="h-5 w-5 text-purple-500" /> },
  { name: "Events", path: "/knowledge-hub/events", icon: <Calendar className="h-5 w-5 text-indigo-500" /> },
  { name: "Resources", path: "/knowledge-hub", icon: <Book className="h-5 w-5 text-teal-500" /> },
  { name: "Investment", path: "/investment", icon: <TrendingUp className="h-5 w-5 text-emerald-500" /> },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Reset state when dialog closes
      setSearchQuery("");
      setIsTyping(false);
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
  
  // Simulate typing effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (searchQuery.length > 0) {
      setIsTyping(true);
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, 500);
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 max-h-[90vh] overflow-hidden rounded-xl border-none shadow-2xl bg-white/95 backdrop-blur-md">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="h-5 w-5 text-moh-darkGreen absolute left-4 top-1/2 transform -translate-y-1/2" />
                <Input
                  ref={inputRef}
                  placeholder="Search for innovations, challenges, resources..."
                  className="pl-12 text-lg h-14 rounded-full bg-gray-50 border-gray-100 focus-visible:ring-moh-green focus-visible:ring-opacity-20 focus-visible:border-moh-green/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button type="button" size="icon" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
            <div className="px-6 border-b">
              <TabsList className="h-14 bg-transparent">
                <TabsTrigger value="all" className="data-[state=active]:bg-moh-green data-[state=active]:text-white rounded-full">All</TabsTrigger>
                <TabsTrigger value="innovations" className="data-[state=active]:bg-moh-green data-[state=active]:text-white rounded-full">Innovations</TabsTrigger>
                <TabsTrigger value="challenges" className="data-[state=active]:bg-moh-green data-[state=active]:text-white rounded-full">Challenges</TabsTrigger>
                <TabsTrigger value="knowledge" className="data-[state=active]:bg-moh-green data-[state=active]:text-white rounded-full">Knowledge</TabsTrigger>
                <TabsTrigger value="investment" className="data-[state=active]:bg-moh-green data-[state=active]:text-white rounded-full">Investment</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="overflow-y-auto flex-1 p-6">
              <AnimatePresence mode="wait">
                {isTyping ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center items-center py-12"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-moh-green animate-bounce [animation-delay:0ms]"></div>
                        <div className="w-3 h-3 rounded-full bg-moh-green animate-bounce [animation-delay:150ms]"></div>
                        <div className="w-3 h-3 rounded-full bg-moh-green animate-bounce [animation-delay:300ms]"></div>
                      </div>
                      <p className="text-sm text-gray-500">Searching...</p>
                    </div>
                  </motion.div>
                ) : searchQuery ? (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="py-4"
                  >
                    <div className="text-center">
                      <p className="text-md text-gray-600 mb-8">Showing results for "<span className="font-medium text-moh-green">{searchQuery}</span>"</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Mock search results */}
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4"
                          >
                            <div className="h-32 bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                              <Search className="h-6 w-6 text-gray-300" />
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <div className="bg-moh-lightGreen/50 text-moh-green text-xs px-2 py-0.5 rounded-full">
                                  Result {i}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Matches your search
                                </div>
                              </div>
                              <h3 className="font-medium mt-1">Search result title here</h3>
                              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                                This is a mock search result for "{searchQuery}".
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="suggestions"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0 }}
                  >
                    <TabsContent value="all" className="mt-0 space-y-8">
                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-moh-green" />
                          Trending Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {trendingSearches.map((item, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="text-sm rounded-full border-gray-200 hover:border-moh-green/30 hover:bg-moh-lightGreen/20 flex items-center gap-2"
                              onClick={() => setSearchQuery(item.term)}
                            >
                              {item.icon}
                              {item.term}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-moh-green" />
                          Recent Searches
                        </h3>
                        <ul className="grid grid-cols-1 gap-1">
                          {recentSearches.map((search, index) => (
                            <li key={index} className="flex items-center justify-between group">
                              <Button 
                                variant="ghost" 
                                className="w-full justify-start px-3 py-2 text-gray-600 hover:bg-moh-lightGreen/20 hover:text-moh-darkGreen rounded-lg"
                                onClick={() => setSearchQuery(search)}
                              >
                                <Clock className="h-4 w-4 mr-3 text-gray-400" />
                                {search}
                              </Button>
                              <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 rounded-full">
                                <X className="h-3 w-3" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <h3 className="text-sm font-medium text-gray-500 mb-4">
                          Popular Categories
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {popularCategories.map((category, index) => (
                            <Link 
                              key={index} 
                              to={category.path}
                              className="group flex flex-col items-center justify-center p-4 border border-gray-100 rounded-xl hover:bg-moh-lightGreen/20 hover:border-moh-green/30 transition-colors"
                              onClick={() => onOpenChange(false)}
                            >
                              <div className="bg-white rounded-full p-3 shadow-sm mb-3 group-hover:shadow-md transition-all">
                                {category.icon}
                              </div>
                              <span className="text-sm font-medium text-gray-700 group-hover:text-moh-green transition-colors">{category.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    </TabsContent>
                    
                    {/* Other tabs content with similar structure */}
                    <TabsContent value="innovations" className="mt-0">
                      <div className="py-8 text-center">
                        <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-2">Search Innovation Catalog</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Discover the latest healthcare innovations, medical devices, digital health solutions and more.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="challenges" className="mt-0">
                      <div className="py-8 text-center">
                        <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-2">Search Challenges</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Find open challenges, innovation opportunities and contests from the Ministry of Health.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="knowledge" className="mt-0">
                      <div className="py-8 text-center">
                        <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-2">Search Knowledge Resources</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Browse articles, publications, guidelines, case studies and educational resources.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="investment" className="mt-0">
                      <div className="py-8 text-center">
                        <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-moh-darkGreen mb-2">Search Investment Options</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Explore funding opportunities, investor networks, and financial resources for healthcare innovation.
                        </p>
                      </div>
                    </TabsContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
