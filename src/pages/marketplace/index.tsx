
import { useState, useEffect } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Innovation } from "@/types/innovations";
import { motion } from "framer-motion";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import MarketplaceInnovationList from "@/components/marketplace/MarketplaceInnovationList";
import MarketplaceSidebar from "@/components/marketplace/MarketplaceSidebar";
import { mockMarketplaceInnovations } from "@/components/marketplace/mockData";
import { useToast } from "@/components/ui/use-toast";

export default function MarketplacePage() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [filteredInnovations, setFilteredInnovations] = useState<Innovation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [ipStatusFilter, setIpStatusFilter] = useState("all");
  const [licensingFilter, setLicensingFilter] = useState("all");
  const [savedSearches, setSavedSearches] = useState<Array<{id: string; name: string}>>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();
  
  // Load innovations data
  useEffect(() => {
    const fetchInnovations = async () => {
      try {
        // In a real implementation, this would be a call to an API
        // const response = await fetch('/api/marketplace-innovations');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setInnovations(mockMarketplaceInnovations);
          setFilteredInnovations(mockMarketplaceInnovations);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching marketplace innovations:", error);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading innovations",
          description: "Failed to load marketplace innovations. Please try again later."
        });
      }
    };
    
    fetchInnovations();
  }, [toast]);
  
  // Filter innovations based on search and filters
  useEffect(() => {
    if (innovations.length === 0) return;
    
    const results = innovations.filter(innovation => {
      // Match search term
      const matchesSearch = searchTerm === "" || 
        innovation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        innovation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (innovation.tags && innovation.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      // Match category filter
      const matchesCategory = categoryFilter === "all" || 
        innovation.category === categoryFilter;
      
      // Match IP status filter
      const matchesIpStatus = ipStatusFilter === "all" || 
        (innovation.ipStatus && innovation.ipStatus === ipStatusFilter);
      
      // Match licensing filter
      const matchesLicensing = licensingFilter === "all" || 
        (innovation.licensingStatus && innovation.licensingStatus === licensingFilter);
      
      return matchesSearch && matchesCategory && matchesIpStatus && matchesLicensing;
    });
    
    setFilteredInnovations(results);
  }, [searchTerm, categoryFilter, ipStatusFilter, licensingFilter, innovations]);
  
  const saveCurrentSearch = () => {
    const newSearch = {
      id: `search-${Date.now()}`,
      name: searchTerm || "All innovations",
    };
    
    setSavedSearches(prev => [...prev, newSearch]);
    toast({
      title: "Search saved",
      description: "You'll receive notifications for new matching innovations."
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <MarketplaceHero />
        
        {/* Marketplace content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar with filters */}
              <div className="lg:w-1/4">
                <MarketplaceSidebar 
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  ipStatusFilter={ipStatusFilter}
                  setIpStatusFilter={setIpStatusFilter}
                  licensingFilter={licensingFilter}
                  setLicensingFilter={setLicensingFilter}
                  savedSearches={savedSearches}
                />
              </div>
              
              {/* Main content area */}
              <div className="lg:w-3/4">
                {/* Search and filters */}
                <MarketplaceFilters 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  saveSearch={saveCurrentSearch}
                  resultsCount={filteredInnovations.length}
                />
                
                {/* Innovations list */}
                <MarketplaceInnovationList 
                  innovations={filteredInnovations}
                  isLoading={isLoading}
                  viewMode={viewMode}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <motion.section 
          className="bg-gradient-to-r from-moh-lightGreen to-moh-green py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Have an innovation to showcase?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join our marketplace to showcase your innovation, protect your intellectual property, 
              and explore licensing opportunities.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/dashboard/innovations/new">Submit Your Innovation</a>
            </Button>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
