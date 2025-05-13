
import { useState, useRef, useEffect } from "react";
import { Innovation } from "./types";
import { InnovationCard } from "./InnovationCard";
import { CarouselNavButton } from "./CarouselNavButton";
import { EmptyStateMessage } from "./EmptyStateMessage";
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

  const maxScroll = scrollContainerRef.current 
    ? scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : 0;

  const isAtStart = scrollPosition <= 0;
  const isAtEnd = scrollPosition >= maxScroll;

  return (
    <div className="relative">
      {isScrollable && (
        <>
          <CarouselNavButton 
            direction="left"
            onClick={scrollLeft}
            disabled={isAtStart}
          />
          
          <CarouselNavButton 
            direction="right"
            onClick={scrollRight}
            disabled={isAtEnd}
          />
        </>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-6 snap-x hide-scrollbar"
      >
        {innovations.length > 0 ? (
          <CarouselContent innovations={innovations} />
        ) : (
          <EmptyStateMessage />
        )}
      </div>
    </div>
  );
};

// Extracted carousel content component
interface CarouselContentProps {
  innovations: Innovation[];
}

const CarouselContent = ({ innovations }: CarouselContentProps) => {
  return (
    <>
      {innovations.map((innovation) => (
        <div 
          key={innovation.id} 
          className="min-w-[300px] md:min-w-[350px] w-80 flex-shrink-0 snap-center px-3"
        >
          <InnovationCard innovation={innovation} />
        </div>
      ))}
    </>
  );
};
