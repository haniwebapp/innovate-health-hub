
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";

export default function AboutSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center opacity-0">
          <div className="order-2 md:order-1">
            <div className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4">
              About the Platform
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen leading-tight">
              Transforming Healthcare Through Innovation
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-gray-700 leading-relaxed">
                The Health Innovation Platform is a key initiative aligned with Saudi Arabia's 
                Vision 2030 and the Ministry of Health's strategic goals to transform healthcare 
                delivery across the Kingdom.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our platform serves as a comprehensive ecosystem connecting innovators, investors, 
                and regulators, streamlining the journey from idea to implementation.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen group">
                Learn About Vision 2030
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold group">
                Ministry Strategy
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl relative group bg-moh-darkGreen/5">
              <div className="aspect-video relative">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Healthcare innovation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-moh-green/90 flex items-center justify-center cursor-pointer hover:bg-moh-green hover:scale-110 transition-all shadow-lg">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-moh-green text-white px-4 py-2 text-sm rounded-md font-medium">
                    Overview Video
                  </span>
                  <span className="bg-white/80 backdrop-blur-sm text-moh-darkGreen px-3 py-1 text-xs rounded-md">
                    2:45
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
