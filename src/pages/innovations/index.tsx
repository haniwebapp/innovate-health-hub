
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import InnovationCard from "@/components/innovations/InnovationCard";
import {
  Filter,
  Search,
  Grid,
  ListFilter,
  ArrowUpRight,
  Award,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Innovation } from "@/types/innovations";

// Mock data for innovations
const mockInnovations: Innovation[] = [
  {
    id: "1",
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning tool that helps doctors diagnose complex conditions with higher accuracy.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Digital Health",
    tags: ["AI", "Diagnostics", "Machine Learning"],
    rating: 4.8,
    status: "Validated",
    createdAt: "2024-04-15"
  },
  {
    id: "2",
    title: "Remote Patient Monitoring Platform",
    description: "Comprehensive system for monitoring patients at home with real-time data transmission to healthcare providers.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Telehealth",
    tags: ["Remote Care", "IoT", "Patient Monitoring"],
    rating: 4.5,
    status: "Scaling",
    createdAt: "2024-02-20"
  },
  {
    id: "3",
    title: "Smart Medication Dispenser",
    description: "Device that helps patients adhere to complex medication regimens with reminders and monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Medical Devices",
    tags: ["IoT", "Medication Management", "Elderly Care"],
    rating: 4.2,
    status: "New",
    createdAt: "2024-05-01"
  },
  {
    id: "4",
    title: "VR Therapy for Chronic Pain",
    description: "Virtual reality platform designed to provide alternative pain management strategies without medication.",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Therapeutics",
    tags: ["VR", "Pain Management", "Digital Therapeutics"],
    rating: 4.6,
    status: "Validated",
    createdAt: "2024-03-10"
  },
  {
    id: "5",
    title: "Portable Ultrasound Device",
    description: "Affordable handheld ultrasound that connects to smartphones for use in remote locations.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Medical Devices",
    tags: ["Ultrasound", "Portable", "Rural Healthcare"],
    rating: 4.7,
    status: "Established",
    createdAt: "2023-11-05"
  },
  {
    id: "6",
    title: "Blockchain for Medical Records",
    description: "Secure system for managing and sharing medical records across healthcare providers using blockchain technology.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Digital Health",
    tags: ["Blockchain", "Data Security", "Health Records"],
    rating: 4.3,
    status: "Scaling",
    createdAt: "2024-01-15"
  }
];

export default function InnovationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredInnovations, setFilteredInnovations] = useState<Innovation[]>(mockInnovations);

  // Categories derived from data
  const categories = ["all", ...Array.from(new Set(mockInnovations.map(item => item.category)))];
  const statuses = ["all", ...Array.from(new Set(mockInnovations.map(item => item.status)))];

  // Filter and sort innovations whenever filters change
  useEffect(() => {
    let filtered = [...mockInnovations];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "highest_rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredInnovations(filtered);
  }, [searchTerm, categoryFilter, statusFilter, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative py-12">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-moh-darkGreen">
                Health Innovations Showcase
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Discover cutting-edge innovations transforming healthcare across Saudi Arabia
              </p>
            </div>
          </div>
        </div>

        {/* Filters and search section */}
        <section className="py-8 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    placeholder="Search innovations..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] bg-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="highest_rated">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex rounded-md overflow-hidden border border-gray-200">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    className={`rounded-none ${viewMode === "grid" ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                    onClick={() => setViewMode("grid")}
                    size="icon"
                  >
                    <Grid size={18} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    className={`rounded-none ${viewMode === "list" ? "bg-moh-green hover:bg-moh-darkGreen" : ""}`}
                    onClick={() => setViewMode("list")}
                    size="icon"
                  >
                    <ListFilter size={18} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredInnovations.length} innovation{filteredInnovations.length !== 1 ? 's' : ''}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    Search: {searchTerm}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setSearchTerm("")}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </Badge>
                )}
                
                {categoryFilter !== "all" && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    Category: {categoryFilter}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setCategoryFilter("all")}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </Badge>
                )}
                
                {statusFilter !== "all" && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    Status: {statusFilter}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setStatusFilter("all")}
                    >
                      <span className="sr-only">Remove</span>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Innovations list */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredInnovations.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No innovations found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInnovations.map((innovation) => (
                  <InnovationCard key={innovation.id} innovation={innovation} view="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredInnovations.map((innovation) => (
                  <InnovationCard key={innovation.id} innovation={innovation} view="list" />
                ))}
              </div>
            )}
            
            {filteredInnovations.length > 0 && (
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen">
                  Load More Innovations
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Call to action */}
        <section className="py-16 bg-gradient-to-r from-moh-lightGreen to-moh-lightGold">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex mb-6 p-2 bg-white/20 backdrop-blur-sm rounded-full">
                <Award size={24} className="text-moh-darkGold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
                Have an innovative healthcare solution?
              </h2>
              <p className="text-gray-700 mb-8">
                Submit your innovation to be featured on our platform and connect with investors, 
                regulators, and potential partners across Saudi Arabia's healthcare ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
                  Submit Your Innovation
                </Button>
                <Button variant="outline" className="border-moh-darkGreen text-moh-darkGreen hover:bg-white/50">
                  Learn About the Process
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
