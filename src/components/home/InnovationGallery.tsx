
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ParallaxCard } from "@/components/animations/ParallaxCard";

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
const innovationsMock: Innovation[] = [{
  id: "1",
  title: "AI-Powered Diabetes Monitoring",
  image: "/lovable-uploads/490e4e1f-9428-448f-87b4-1ee68f24331c.png",
  category: "Digital Health",
  trl: 7,
  featured: true,
  summary: "Continuous glucose monitoring with AI-powered insights and predictive analytics."
}, {
  id: "2",
  title: "Remote Patient Monitoring System",
  image: "/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png",
  category: "Telehealth",
  trl: 8,
  featured: true,
  summary: "End-to-end platform for remote patient monitoring with integrated vital signs tracking."
}, {
  id: "3",
  title: "Smart Hospital Management Suite",
  image: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
  category: "Healthcare IT",
  trl: 6,
  featured: false,
  summary: "Comprehensive hospital management system with resource optimization algorithms."
}, {
  id: "4",
  title: "Portable Diagnostic Device",
  image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png",
  category: "MedTech",
  trl: 5,
  featured: false,
  summary: "Handheld device capable of running multiple diagnostic tests with cloud connectivity."
}, {
  id: "5",
  title: "Mental Health Tracking App",
  image: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
  category: "Digital Health",
  trl: 9,
  featured: true,
  summary: "App for tracking mental well-being with personalized recommendations and professional support."
}];

// Filter options
const categories = ["All", "Digital Health", "Telehealth", "MedTech", "Healthcare IT"];
const trlLevels = ["All", "Early Stage (1-3)", "Mid Stage (4-6)", "Late Stage (7-9)"];

export default function InnovationGallery() {
  const {
    t,
    language
  } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTRL, setActiveTRL] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

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
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const checkScrollable = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsScrollable(scrollWidth > clientWidth);
    }
  };
  
  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [filteredInnovations]);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
      setScrollPosition(scrollContainerRef.current.scrollLeft - 300);
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
      setScrollPosition(scrollContainerRef.current.scrollLeft + 300);
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setScrollPosition(scrollContainerRef.current.scrollLeft);
      }
    };
    
    scrollContainerRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
            {t('home.innovations.title') || "Explore Healthcare Innovations"}
          </h2>
          
          <p className="max-w-2xl mx-auto text-gray-700">
            {t('home.innovations.subtitle') || "Discover groundbreaking healthcare solutions developed by innovators across Saudi Arabia."}
          </p>
        </motion.div>
        
        {/* Filter controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer px-3 py-1 ${
                  activeFilter === category 
                    ? 'bg-moh-lightGreen text-moh-darkGreen border-moh-green' 
                    : 'hover:bg-moh-lightGreen/30 hover:text-moh-darkGreen'
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {trlLevels.map((trl) => (
              <Badge
                key={trl}
                variant="outline"
                className={`cursor-pointer px-3 py-1 ${
                  activeTRL === trl 
                    ? 'bg-moh-lightGold text-moh-darkGold border-moh-gold' 
                    : 'hover:bg-moh-lightGold/30 hover:text-moh-darkGold'
                }`}
                onClick={() => setActiveTRL(trl)}
              >
                {trl}
              </Badge>
            ))}
          </div>
          
          <Badge
            variant="outline"
            className={`cursor-pointer px-3 py-1 ${
              featuredOnly 
                ? 'bg-moh-gold/30 text-moh-darkGold border-moh-gold' 
                : 'hover:bg-moh-gold/10 hover:text-moh-darkGold'
            }`}
            onClick={() => setFeaturedOnly(!featuredOnly)}
          >
            <Star className={`h-4 w-4 mr-1 ${featuredOnly ? 'text-moh-gold fill-moh-gold' : ''}`} />
            Featured Only
          </Badge>
        </div>
        
        {/* Innovation Cards */}
        <div className="relative">
          {isScrollable && (
            <>
              <Button 
                variant="outline" 
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border-moh-lightGreen hover:bg-moh-lightGreen/20 shadow-md"
                onClick={scrollLeft}
                disabled={scrollPosition <= 0}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border-moh-lightGreen hover:bg-moh-lightGreen/20 shadow-md"
                onClick={scrollRight}
                disabled={scrollContainerRef.current && scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 snap-x hide-scrollbar"
          >
            {filteredInnovations.length > 0 ? (
              filteredInnovations.map((innovation, index) => (
                <div 
                  key={innovation.id} 
                  className="min-w-[300px] md:min-w-[350px] w-80 flex-shrink-0 snap-center px-3"
                >
                  <ParallaxCard 
                    className="h-full"
                    dataValue={innovation.trl * 10}
                    priority={innovation.featured ? 'high' : 'medium'}
                  >
                    <Card className="overflow-hidden h-full border-none shadow-md">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={innovation.image} 
                          alt={innovation.title}
                          className="w-full h-full object-cover object-center" 
                        />
                        {innovation.featured && (
                          <div className="absolute top-3 right-3 bg-moh-gold/90 text-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-white" />
                            Featured
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <Badge className="bg-moh-lightGreen text-moh-darkGreen">
                            {innovation.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-moh-darkGreen">
                          {innovation.title}
                        </h3>
                        <div className="flex items-center mb-3 gap-2">
                          <span className="text-sm text-gray-500">TRL Level:</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                innovation.trl > 6 ? 'bg-moh-green' : 
                                innovation.trl > 3 ? 'bg-moh-gold' : 
                                'bg-orange-400'
                              }`}
                              style={{ width: `${(innovation.trl / 9) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{innovation.trl}/9</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {innovation.summary}
                        </p>
                        <Button 
                          variant="outline"
                          className="mt-4 w-full border-moh-lightGreen text-moh-green hover:bg-moh-lightGreen/20"
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </ParallaxCard>
                </div>
              ))
            ) : (
              <div className="min-w-full flex items-center justify-center py-12">
                <div className="text-center text-gray-500">
                  <p className="text-xl font-medium mb-2">No innovations found</p>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Statistics and CTA */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex gap-8 mb-6 md:mb-0">
            <div className="text-center">
              <p className="text-3xl font-bold text-moh-darkGreen">120+</p>
              <p className="text-gray-500">Innovations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-moh-darkGreen">35+</p>
              <p className="text-gray-500">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-moh-darkGreen">18M+</p>
              <p className="text-gray-500">Investment</p>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-moh-darkGreen to-moh-green text-white hover:shadow-lg transition-all">
            View All Innovations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
