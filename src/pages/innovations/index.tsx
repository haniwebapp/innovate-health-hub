
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
  Lightbulb,
  FileUp,
  Sparkles,
  Tags,
  Calendar,
  Star,
  Clock,
  Scale,
  X,
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
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for innovations with enhanced properties
const mockInnovations: Innovation[] = [
  {
    id: "1",
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning tool that helps doctors diagnose complex conditions with higher accuracy. The system uses pattern recognition and deep learning to identify potential conditions based on symptoms, medical history, and diagnostic tests, offering suggestions with probability ratings.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Digital Health",
    tags: ["AI", "Diagnostics", "Machine Learning"],
    rating: 4.8,
    status: "Validated",
    createdAt: "2024-04-15",
    organization: "HealthTech Solutions",
    website: "https://healthtech-solutions.example",
    contact: "info@healthtechsolutions.example",
    aiMatchScore: 94,
    impactMetrics: {
      potentialReach: 50000,
      costEfficiency: 78,
      implementationTime: 3,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["ISO 13485", "CE Mark"],
      pendingApprovals: [],
    }
  },
  {
    id: "2",
    title: "Remote Patient Monitoring Platform",
    description: "Comprehensive system for monitoring patients at home with real-time data transmission to healthcare providers. The platform connects to various medical devices and wearables to track vital signs, medication adherence, and other health metrics with alert systems for critical situations.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Telehealth",
    tags: ["Remote Care", "IoT", "Patient Monitoring"],
    rating: 4.5,
    status: "Scaling",
    createdAt: "2024-02-20",
    organization: "TeleCare Systems",
    website: "https://telecare-systems.example",
    contact: "support@telecaresystems.example",
    aiMatchScore: 87,
    impactMetrics: {
      potentialReach: 120000,
      costEfficiency: 65,
      implementationTime: 6,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["HIPAA Compliant", "FDA Approved"],
      pendingApprovals: [],
    }
  },
  {
    id: "3",
    title: "Smart Medication Dispenser",
    description: "Device that helps patients adhere to complex medication regimens with reminders and monitoring. The smart dispenser automatically sorts medications, provides timely alerts, tracks adherence, and can notify caregivers or healthcare providers when doses are missed.",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Medical Devices",
    tags: ["IoT", "Medication Management", "Elderly Care"],
    rating: 4.2,
    status: "New",
    createdAt: "2024-05-01",
    organization: "CareTech Innovations",
    website: "https://caretech.example",
    contact: "info@caretech.example",
    aiMatchScore: 76,
    regulatoryStatus: {
      compliant: false,
      certifications: [],
      pendingApprovals: ["FDA Clearance", "CE Mark"],
    }
  },
  {
    id: "4",
    title: "VR Therapy for Chronic Pain",
    description: "Virtual reality platform designed to provide alternative pain management strategies without medication. This immersive therapy uses distraction techniques, guided meditation, and cognitive behavioral therapy principles delivered through engaging virtual environments to help patients manage chronic pain conditions.",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Therapeutics",
    tags: ["VR", "Pain Management", "Digital Therapeutics"],
    rating: 4.6,
    status: "Validated",
    createdAt: "2024-03-10",
    organization: "Immersive Health",
    website: "https://immersive-health.example",
    contact: "contact@immersivehealth.example",
    aiMatchScore: 82,
    impactMetrics: {
      potentialReach: 75000,
      costEfficiency: 89,
      implementationTime: 2,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["FDA Breakthrough Device"],
      pendingApprovals: ["Health Canada Approval"],
    }
  },
  {
    id: "5",
    title: "Portable Ultrasound Device",
    description: "Affordable handheld ultrasound that connects to smartphones for use in remote locations. This pocket-sized device brings advanced imaging capabilities to underserved areas, allowing for preliminary diagnostics in locations with limited access to healthcare facilities.",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Medical Devices",
    tags: ["Ultrasound", "Portable", "Rural Healthcare"],
    rating: 4.7,
    status: "Established",
    createdAt: "2023-11-05",
    organization: "MobileMed Technologies",
    website: "https://mobilemed.example",
    contact: "sales@mobilemed.example",
    impactMetrics: {
      potentialReach: 500000,
      costEfficiency: 92,
      implementationTime: 1,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["FDA Approved", "CE Mark", "ISO 13485"],
      pendingApprovals: [],
    }
  },
  {
    id: "6",
    title: "Blockchain for Medical Records",
    description: "Secure system for managing and sharing medical records across healthcare providers using blockchain technology. The platform ensures data integrity, patient ownership of records, immutable audit trails, and secure permissioned access for healthcare providers while maintaining compliance with privacy regulations.",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "Healthcare IT",
    tags: ["Blockchain", "Data Security", "Health Records"],
    rating: 4.3,
    status: "Scaling",
    createdAt: "2024-01-15",
    organization: "SecureHealth Chain",
    website: "https://securehealthchain.example",
    contact: "info@securehealthchain.example",
    aiMatchScore: 89,
    impactMetrics: {
      potentialReach: 1000000,
      costEfficiency: 74,
      implementationTime: 8,
    },
    regulatoryStatus: {
      compliant: true,
      certifications: ["HIPAA Compliant", "GDPR Compliant"],
      pendingApprovals: [],
    }
  }
];

export default function InnovationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredInnovations, setFilteredInnovations] = useState<Innovation[]>(mockInnovations);
  const [showAIMatches, setShowAIMatches] = useState(false);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  
  // Additional filter options
  const [regulatoryFilter, setRegulatoryFilter] = useState("all");
  
  // Track if this is the first render for animation purposes
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Categories derived from data
  const categories = ["all", ...Array.from(new Set(mockInnovations.map(item => item.category)))];
  const statuses = ["all", ...Array.from(new Set(mockInnovations.map(item => item.status)))];
  
  // Get all unique tags from innovations
  const allTags = Array.from(new Set(mockInnovations.flatMap(item => item.tags)));
  
  // Filters for regulatory status
  const regulatoryStatuses = ["all", "compliant", "pending"];
  
  // Effect to set first render to false after component mounts
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Filter and sort innovations whenever filters change
  useEffect(() => {
    let filtered = [...mockInnovations];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.organization && item.organization.toLowerCase().includes(searchTerm.toLowerCase()))
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
    
    // Apply tag filter
    if (tagFilter) {
      filtered = filtered.filter(item => item.tags.includes(tagFilter));
    }
    
    // Apply regulatory filter
    if (regulatoryFilter !== "all") {
      filtered = filtered.filter(item => {
        if (!item.regulatoryStatus) return false;
        if (regulatoryFilter === "compliant") return item.regulatoryStatus.compliant;
        if (regulatoryFilter === "pending") return !item.regulatoryStatus.compliant;
        return true;
      });
    }
    
    // Apply AI match filter
    if (showAIMatches) {
      filtered = filtered.filter(item => item.aiMatchScore !== undefined && item.aiMatchScore > 75);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "highest_rated":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "ai_match":
        filtered.sort((a, b) => {
          const scoreA = a.aiMatchScore || 0;
          const scoreB = b.aiMatchScore || 0;
          return scoreB - scoreA;
        });
        break;
      default:
        break;
    }
    
    setFilteredInnovations(filtered);
  }, [searchTerm, categoryFilter, statusFilter, sortBy, showAIMatches, tagFilter, regulatoryFilter]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

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
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-moh-green hover:bg-moh-darkGreen text-white flex items-center gap-2 group"
                >
                  <Link to="/innovations/submit">
                    <FileUp size={18} />
                    Submit Innovation
                    <span className="hidden sm:inline ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20 flex items-center gap-2"
                  onClick={() => setShowAIMatches(!showAIMatches)}
                >
                  <Lightbulb size={18} className={showAIMatches ? "text-yellow-500" : ""} />
                  {showAIMatches ? "Hide AI Matches" : "Show AI Matches"}
                </Button>
              </div>
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
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
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
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by innovation category</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
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
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by implementation status</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Select value={regulatoryFilter} onValueChange={setRegulatoryFilter}>
                          <SelectTrigger className="w-[160px] bg-white">
                            <SelectValue placeholder="Regulatory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Compliance</SelectItem>
                            <SelectItem value="compliant">Compliant</SelectItem>
                            <SelectItem value="pending">Pending Approval</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by regulatory compliance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[160px] bg-white">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="highest_rated">Highest Rated</SelectItem>
                            <SelectItem value="ai_match">Best AI Match</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sort innovations by different criteria</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
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
            
            {/* Active filters display */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredInnovations.length} innovation{filteredInnovations.length !== 1 ? 's' : ''}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    <Search size={12} />
                    {searchTerm}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setSearchTerm("")}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                
                {categoryFilter !== "all" && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    <Filter size={12} />
                    {categoryFilter}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setCategoryFilter("all")}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                
                {statusFilter !== "all" && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    <Clock size={12} />
                    {statusFilter}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setStatusFilter("all")}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                
                {regulatoryFilter !== "all" && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    <Scale size={12} />
                    {regulatoryFilter === "compliant" ? "Compliant" : "Pending Approval"}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setRegulatoryFilter("all")}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                
                {tagFilter && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    <Tags size={12} />
                    {tagFilter}
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setTagFilter(null)}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
                
                {showAIMatches && (
                  <Badge variant="outline" className="bg-white flex gap-1 items-center">
                    <Lightbulb size={12} className="text-yellow-500" />
                    AI Matches
                    <button 
                      className="ml-1 hover:bg-gray-100 rounded-full p-1" 
                      onClick={() => setShowAIMatches(false)}
                    >
                      <X size={12} />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Popular tags */}
            <div className="mt-4 border-t pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Popular tags:</span>
                {allTags.slice(0, 6).map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline" 
                    className={`cursor-pointer hover:bg-gray-100 ${tag === tagFilter ? 'bg-moh-lightGreen text-moh-darkGreen' : 'bg-white'}`}
                    onClick={() => setTagFilter(tag === tagFilter ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
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
                <Button 
                  variant="outline" 
                  className="mt-4 border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                    setStatusFilter("all");
                    setShowAIMatches(false);
                    setTagFilter(null);
                    setRegulatoryFilter("all");
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial={isFirstRender ? "hidden" : false}
                animate="visible"
              >
                {filteredInnovations.map((innovation) => (
                  <motion.div key={innovation.id} variants={itemVariants}>
                    <InnovationCard innovation={innovation} view="grid" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial={isFirstRender ? "hidden" : false}
                animate="visible"
              >
                {filteredInnovations.map((innovation) => (
                  <motion.div key={innovation.id} variants={itemVariants}>
                    <InnovationCard innovation={innovation} view="list" />
                  </motion.div>
                ))}
              </motion.div>
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
        
        {/* Call to action with AI-powered suggestions */}
        <section className="py-16 bg-gradient-to-r from-moh-lightGreen to-moh-lightGold">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/30 backdrop-blur-sm p-6 rounded-xl border border-white/40 shadow-lg">
                <div className="text-center mb-6">
                  <div className="inline-flex mb-4 p-3 bg-white/40 backdrop-blur-sm rounded-full">
                    <Sparkles size={28} className="text-moh-darkGreen" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
                    Have an innovative healthcare solution?
                  </h2>
                  <p className="text-gray-700 mb-8">
                    Submit your innovation to be featured on our platform and connect with investors, 
                    regulators, and potential partners across Saudi Arabia's healthcare ecosystem.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      className="bg-moh-green hover:bg-moh-darkGreen text-white"
                      asChild
                    >
                      <Link to="/innovations/submit">
                        Submit Your Innovation
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-moh-darkGreen text-moh-darkGreen hover:bg-white/50"
                    >
                      Learn About the Process
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-moh-darkGreen/10 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Lightbulb size={18} className="text-moh-gold mr-2" />
                    <h3 className="text-lg font-medium text-moh-darkGreen">
                      AI-Powered Innovation Marketplace
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Our platform uses advanced AI to match your healthcare innovations with the right investors,
                    regulatory pathways, and implementation opportunities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/60 p-3 rounded-md">
                      <p className="text-xs text-gray-600 mb-1">Investor Matching</p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-moh-green" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div className="bg-white/60 p-3 rounded-md">
                      <p className="text-xs text-gray-600 mb-1">Regulatory Guidance</p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-moh-gold" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div className="bg-white/60 p-3 rounded-md">
                      <p className="text-xs text-gray-600 mb-1">Market Analysis</p>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-moh-darkGreen" style={{ width: "78%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
