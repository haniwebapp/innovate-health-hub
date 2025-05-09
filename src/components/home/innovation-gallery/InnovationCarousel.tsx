
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Innovation } from "./types";
import { InnovationCard } from "./InnovationCard";
import "./styles.css";

interface InnovationCarouselProps {
  innovations: Innovation[];
}

export const InnovationCarousel = ({ innovations }: InnovationCarouselProps) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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
  }, [innovations]);
  
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
        {innovations.length > 0 ? (
          innovations.map((innovation) => (
            <div 
              key={innovation.id} 
              className="min-w-[300px] md:min-w-[350px] w-80 flex-shrink-0 snap-center px-3"
            >
              <InnovationCard innovation={innovation} />
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
  );
};
