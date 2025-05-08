
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="grid md:grid-cols-2 gap-8 items-center opacity-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
              About the Platform
            </h2>
            <p className="mb-4 text-gray-700">
              The Health Innovation Platform is a key initiative aligned with Saudi Arabia's 
              Vision 2030 and the Ministry of Health's strategic goals to transform healthcare 
              delivery across the Kingdom.
            </p>
            <p className="mb-6 text-gray-700">
              Our platform serves as a comprehensive ecosystem connecting innovators, investors, 
              and regulators, streamlining the journey from idea to implementation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="border-moh-green text-moh-green">
                Learn About Vision 2030
              </Button>
              <Button variant="outline" className="border-moh-gold text-moh-darkGold">
                Ministry Strategy
              </Button>
            </div>
          </div>
          
          <div className="bg-moh-gray rounded-lg p-1 shadow-md">
            <div className="rounded-lg overflow-hidden aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center bg-moh-green/10">
                {/* Video thumbnail placeholder */}
                <div className="w-16 h-16 rounded-full bg-moh-green flex items-center justify-center cursor-pointer hover:bg-moh-darkGreen transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </div>
                <span className="absolute bottom-4 left-4 bg-moh-green text-white px-3 py-1 text-sm rounded">
                  Overview Video
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
