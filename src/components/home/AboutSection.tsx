
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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
              {t('home.about.tag')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen leading-tight">
              {t('home.about.title')}
            </h2>
            <div className="space-y-4 mb-8">
              <p className="text-gray-700 leading-relaxed">
                {t('home.about.paragraph1')}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {t('home.about.paragraph2')}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen group">
                {t('home.about.vision2030Button')}
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold group">
                {t('home.about.strategyButton')}
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
                    {t('home.about.videoOverlay')}
                  </span>
                  <span className="bg-white/80 backdrop-blur-sm text-moh-darkGreen px-3 py-1 text-xs rounded-md">
                    {t('home.about.videoDuration')}
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
