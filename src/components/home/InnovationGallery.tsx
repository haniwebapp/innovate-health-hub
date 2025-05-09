
import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Innovation {
  id: string;
  title: string;
  image: string;
  category: string;
  trl: number; // Technology Readiness Level
  featured: boolean;
  summary: string;
}

// Sample data - this would come from an API in a real application
const innovationsMock: Innovation[] = [
  {
    id: "1",
    title: "AI-Powered Diabetes Monitoring",
    image: "/lovable-uploads/490e4e1f-9428-448f-87b4-1ee68f24331c.png",
    category: "Digital Health",
    trl: 7,
    featured: true,
    summary: "Continuous glucose monitoring with AI-powered insights and predictive analytics."
  },
  {
    id: "2",
    title: "Remote Patient Monitoring System",
    image: "/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png",
    category: "Telehealth",
    trl: 8,
    featured: true,
    summary: "End-to-end platform for remote patient monitoring with integrated vital signs tracking."
  },
  {
    id: "3",
    title: "Smart Hospital Management Suite",
    image: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
    category: "Healthcare IT",
    trl: 6,
    featured: false,
    summary: "Comprehensive hospital management system with resource optimization algorithms."
  },
  {
    id: "4",
    title: "Portable Diagnostic Device",
    image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png",
    category: "MedTech",
    trl: 5,
    featured: false,
    summary: "Handheld device capable of running multiple diagnostic tests with cloud connectivity."
  },
  {
    id: "5",
    title: "Mental Health Tracking App",
    image: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
    category: "Digital Health",
    trl: 9,
    featured: true,
    summary: "App for tracking mental well-being with personalized recommendations and professional support."
  }
];

// Filter options
const categories = ["All", "Digital Health", "Telehealth", "MedTech", "Healthcare IT"];
const trlLevels = ["All", "Early Stage (1-3)", "Mid Stage (4-6)", "Late Stage (7-9)"];

export default function InnovationGallery() {
  const { t, language } = useLanguage();
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
  
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-4">
            {t('home.innovations.title') || "Innovation Gallery"}
          </h2>
          <p className="text-lg text-gray-600">
            {t('home.innovations.subtitle') || "Explore the latest healthcare innovations across Saudi Arabia"}
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={activeFilter === category ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${activeFilter === category ? 'bg-moh-green hover:bg-moh-darkGreen' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {trlLevels.map((level) => (
              <Badge 
                key={level} 
                variant={activeTRL === level ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 ${activeTRL === level ? 'bg-moh-darkGold hover:bg-moh-gold' : ''}`}
                onClick={() => setActiveTRL(level)}
              >
                {level}
              </Badge>
            ))}
          </div>
          
          <Badge 
            variant={featuredOnly ? "default" : "outline"}
            className={`cursor-pointer px-4 py-2 flex items-center gap-1 ${featuredOnly ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
            onClick={() => setFeaturedOnly(!featuredOnly)}
          >
            <Star className="h-3 w-3" />
            Featured
          </Badge>
        </div>
        
        {/* Innovation Gallery with horizontal scroll */}
        <div className="relative">
          <Button 
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto hide-scrollbar gap-6 pb-4 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredInnovations.length > 0 ? (
              filteredInnovations.map((innovation) => (
                <motion.div 
                  key={innovation.id}
                  className="min-w-[300px] max-w-[300px] flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative h-40">
                      <img 
                        src={innovation.image} 
                        alt={innovation.title}
                        className="w-full h-full object-cover" 
                      />
                      {innovation.featured && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white p-1 rounded-full">
                          <Star className="h-4 w-4" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <Badge className="bg-moh-green">TRL {innovation.trl}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <Badge variant="outline" className="mb-2 w-fit">
                        {innovation.category}
                      </Badge>
                      <h3 className="font-semibold text-lg mb-2 text-moh-darkGreen">
                        {innovation.title}
                      </h3>
                      <p className="text-gray-600 text-sm flex-grow">
                        {innovation.summary}
                      </p>
                      <Button 
                        variant="link" 
                        className="text-moh-green p-0 h-auto mt-4 text-sm justify-start"
                        asChild
                      >
                        <a href={`/innovations/${innovation.id}`}>
                          View Details
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="w-full py-16 text-center text-gray-500">
                No innovations match your selected filters.
              </div>
            )}
          </div>
          
          <Button 
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild className="bg-moh-darkGreen hover:bg-moh-green">
            <a href="/innovations">View All Innovations</a>
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
