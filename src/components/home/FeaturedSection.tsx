
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { WaveDivider } from "@/components/animations/WaveDivider";
import { StatsSection } from "./featured/StatsSection";
import { StoriesCarousel } from "./featured/StoriesCarousel";
import { statsData, successStoriesData } from "./featured/featuredData";

export default function FeaturedSection() {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Animation for stats section
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <WaveDivider className="-mt-16" color="#ffffff" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollFadeIn className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
            Success Stories
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Discover how innovations on our platform are transforming healthcare delivery across Saudi Arabia.
          </p>
        </ScrollFadeIn>
        
        {/* Stats Counter Section */}
        <StatsSection stats={statsData} />
        
        {/* Success Stories Carousel */}
        <div>
          <ScrollFadeIn delay={0.3}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-moh-darkGreen">Highlighted Success Stories</h3>
          </ScrollFadeIn>
          
          <StoriesCarousel stories={successStoriesData} />
        </div>
      </div>
      
      <WaveDivider className="mt-16 rotate-180" color="#ffffff" />
    </section>
  );
}
