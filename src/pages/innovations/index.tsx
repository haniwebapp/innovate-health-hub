
import { useState, useEffect } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import FilterSection from "@/components/innovations/filters/FilterSection";
import TagFilterSection from "@/components/innovations/filters/TagFilterSection";
import InnovationsHero from "@/components/innovations/hero/InnovationsHero";
import InnovationsList from "@/components/innovations/listing/InnovationsList";
import InnovationCallToAction from "@/components/innovations/cta/InnovationCallToAction";
import { mockInnovations } from "@/components/innovations/data/mockInnovations";
import { Innovation } from "@/types/innovations";
import { motion } from "framer-motion";

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
  
  // Effect to set first render to false after component mounts
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  // Reset all filters to their default values
  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
    setShowAIMatches(false);
    setTagFilter(null);
    setRegulatoryFilter("all");
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <InnovationsHero 
          showAIMatches={showAIMatches}
          setShowAIMatches={setShowAIMatches}
        />

        {/* Filters and search section */}
        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          regulatoryFilter={regulatoryFilter}
          setRegulatoryFilter={setRegulatoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showAIMatches={showAIMatches}
          setShowAIMatches={setShowAIMatches}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          filteredCount={filteredInnovations.length}
          categories={categories}
          statuses={statuses}
          resetFilters={resetFilters}
        />

        {/* Popular tags */}
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-sm my-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TagFilterSection
            allTags={allTags}
            tagFilter={tagFilter}
            setTagFilter={setTagFilter}
          />
        </motion.div>

        {/* Innovations list */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredInnovations.length === 0 ? (
              <motion.div 
                className="text-center py-16 bg-moh-lightGreen/10 rounded-xl border border-moh-green/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-medium text-moh-darkGreen mb-2">No innovations found</h3>
                <p className="text-gray-600">Try adjusting your filters or search term</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </Button>
              </motion.div>
            ) : (
              <InnovationsList
                innovations={filteredInnovations}
                viewMode={viewMode}
                isFirstRender={isFirstRender}
              />
            )}
          </div>
        </section>
        
        {/* Call to action with AI-powered suggestions */}
        <InnovationCallToAction />
      </main>
      
      <Footer />
    </div>
  );
}
