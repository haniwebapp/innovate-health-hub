
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StoryCard, SuccessStory } from "./StoryCard";

interface StoriesCarouselProps {
  stories: SuccessStory[];
}

export const StoriesCarousel: React.FC<StoriesCarouselProps> = ({ stories }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, {
    once: true,
    margin: "-100px"
  });

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % stories.length);
  };
  
  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div ref={carouselRef} className="relative">
      <div className="overflow-hidden">
        <motion.div 
          className="flex" 
          animate={{
            x: `-${activeSlide * 100}%`
          }} 
          transition={{
            x: {
              type: "spring",
              stiffness: 300,
              damping: 30
            },
            duration: 0.5
          }}
        >
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} index={index} />
          ))}
        </motion.div>
      </div>
      
      {/* Carousel Controls */}
      <motion.div 
        className="flex justify-between mt-6" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex gap-2">
          {stories.map((_, index) => (
            <button 
              key={index} 
              onClick={() => setActiveSlide(index)} 
              className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-moh-green' : 'bg-gray-300'}`} 
              aria-label={`Go to slide ${index + 1}`} 
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={prevSlide} 
            className="rounded-full w-10 h-10 hover:bg-moh-lightGreen hover:border-moh-green transition-all duration-300 relative overflow-hidden"
          >
            <ArrowLeft className="h-4 w-4 relative z-10" />
            <motion.span 
              className="absolute inset-0 bg-moh-green/10 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ 
                scale: 1,
                transition: { duration: 0.2 }
              }}
            />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={nextSlide} 
            className="rounded-full w-10 h-10 hover:bg-moh-lightGreen hover:border-moh-green transition-all duration-300 relative overflow-hidden"
          >
            <ArrowRight className="h-4 w-4 relative z-10" />
            <motion.span 
              className="absolute inset-0 bg-moh-green/10 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ 
                scale: 1,
                transition: { duration: 0.2 }
              }}
            />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
