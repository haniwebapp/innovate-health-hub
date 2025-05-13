
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { useLanguage } from "@/contexts/LanguageContext";
import InnovationsHero from "@/components/innovations/hero/InnovationsHero";
import StatsSection from "@/components/innovations/stats/StatsSection";
import FeaturedInnovation from "@/components/innovations/featured/FeaturedInnovation";
import FilterBar from "@/components/innovations/filters/FilterBar";
import InnovationsList from "@/components/innovations/listing/InnovationsList";
import EmptyState from "@/components/innovations/EmptyState";
import { 
  Innovation,
  mockInnovations,
  categories,
  stages,
  featuredInnovation
} from "@/components/innovations/model/innovation.data";

export default function InnovationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const [showAIMatches, setShowAIMatches] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const { t, language } = useLanguage();
  
  // Fetch innovations from API (using mock data for now)
  const { data: innovations, isLoading, error } = useQuery<Innovation[]>({
    queryKey: ['innovations'],
    queryFn: async () => {
      // In a real app, this would be fetching from an API
      return new Promise<Innovation[]>(resolve => {
        setTimeout(() => resolve(mockInnovations), 1000);
      });
    }
  });
  
  // Filter innovations based on search and filters
  const filteredInnovations = innovations?.filter(innovation => {
    const matchesSearch = innovation.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         innovation.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All Categories" || 
                           innovation.category === categoryFilter;
                           
    const matchesStage = stageFilter === "All Stages" ||
                        innovation.stage === stageFilter;
                        
    return matchesSearch && matchesCategory && matchesStage;
  });
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All Categories");
    setStageFilter("All Stages");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGreen">
      <Navbar />
      <ScrollProgress />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        {/* Hero Section */}
        <InnovationsHero 
          showAIMatches={showAIMatches}
          setShowAIMatches={setShowAIMatches}
        />
        
        {/* Innovation stats section */}
        <StatsSection />
        
        {/* Featured innovation section */}
        <FeaturedInnovation featuredInnovation={featuredInnovation} />
        
        {/* Innovations listing */}
        <section id="innovations-list" className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Browse Innovations</h2>
              <p className="text-gray-600">Discover the latest healthcare innovations making an impact across the Kingdom</p>
            </div>
            
            {/* Filters */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              stageFilter={stageFilter}
              setStageFilter={setStageFilter}
              categories={categories}
              stages={stages}
              handleResetFilters={handleResetFilters}
            />
            
            {/* Results info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredInnovations?.length || 0} innovations
              </p>
            </div>
            
            {/* Innovation grid */}
            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 overflow-hidden bg-white animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-4/6"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!isLoading && filteredInnovations?.length === 0 && (
              <EmptyState onResetFilters={handleResetFilters} />
            )}
            
            {!isLoading && filteredInnovations && filteredInnovations.length > 0 && (
              <InnovationsList
                innovations={filteredInnovations}
                viewMode={viewMode}
                isFirstRender={isFirstRender}
              />
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
