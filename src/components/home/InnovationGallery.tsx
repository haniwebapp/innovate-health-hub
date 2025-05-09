
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Innovation, innovationsMock } from "./innovation-gallery/types";
import { FilterControls } from "./innovation-gallery/FilterControls";
import { InnovationCarousel } from "./innovation-gallery/InnovationCarousel";
import { StatisticsSection } from "./innovation-gallery/StatisticsSection";

export default function InnovationGallery() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTRL, setActiveTRL] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Filter innovations based on selected filters
  const filteredInnovations = innovationsMock.filter(innovation => {
    const categoryMatch = activeFilter === "All" || innovation.category === activeFilter;
    let trlMatch = true;
    if (activeTRL === "Early Stage (1-3)") {
      trlMatch = innovation.trl >= 1 && innovation.trl <= 3;
    } else if (activeTRL === "Mid Stage (4-6)") {
      trlMatch = innovation.trl >= 4 && innovation.trl <= 6;
    } else if (activeTRL === "Late Stage (7-9)") {
      trlMatch = innovation.trl >= 7 && innovation.trl <= 9;
    }
    const featuredMatch = featuredOnly ? innovation.featured : true;
    return categoryMatch && trlMatch && featuredMatch;
  });
  
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-moh-lightGreen/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-moh-lightGold/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4">
            {t('home.innovations.tag') || "Innovation Showcase"}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
            {t('home.innovations.title') || "Healthcare Solutions Gallery"}
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('home.innovations.subtitle') || "Discover innovative solutions transforming Saudi healthcare"}
          </p>
        </motion.div>
        
        {/* Filter controls */}
        <FilterControls 
          activeFilter={activeFilter}
          activeTRL={activeTRL}
          featuredOnly={featuredOnly}
          onFilterChange={setActiveFilter}
          onTRLChange={setActiveTRL}
          onFeaturedToggle={() => setFeaturedOnly(!featuredOnly)}
        />
        
        {/* Innovation Cards */}
        <InnovationCarousel innovations={filteredInnovations} />
        
        {/* Statistics and CTA */}
        <StatisticsSection />
      </div>
    </section>
  );
}
