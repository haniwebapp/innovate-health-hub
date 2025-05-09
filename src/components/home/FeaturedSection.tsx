
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Stat {
  value: number;
  labelKey: string;
  suffix: string;
}

interface SuccessStory {
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  image: string;
}

export default function FeaturedSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const stats: Stat[] = [
    { value: 325, labelKey: "home.featured.stats.innovators", suffix: "+" },
    { value: 42, labelKey: "home.featured.stats.investments", suffix: "M" },
    { value: 18, labelKey: "home.featured.stats.launched", suffix: "" },
    { value: 95, labelKey: "home.featured.stats.success", suffix: "%" },
  ];
  
  const successStories: SuccessStory[] = [
    {
      titleKey: "home.featured.story1.title",
      categoryKey: "home.featured.story1.category",
      descriptionKey: "home.featured.story1.description",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
    {
      titleKey: "home.featured.story2.title",
      categoryKey: "home.featured.story2.category",
      descriptionKey: "home.featured.story2.description",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
    },
    {
      titleKey: "home.featured.story3.title",
      categoryKey: "home.featured.story3.category",
      descriptionKey: "home.featured.story3.description",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    }
  ];

  useEffect(() => {
    // Animation for stats section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (carouselRef.current) observer.unobserve(carouselRef.current);
    };
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % successStories.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
            {t('home.featured.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            {t('home.featured.description')}
          </p>
        </div>
        
        {/* Stats Counter Section */}
        <div 
          ref={statsRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 opacity-0"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center">
                <span className="stat-counter" data-value={stat.value}>
                  {stat.value}
                </span>
                <span className="text-3xl font-bold text-moh-green">{stat.suffix}</span>
              </div>
              <p className="text-gray-600 mt-2">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
        
        {/* Success Stories Carousel */}
        <div 
          ref={carouselRef} 
          className="opacity-0"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-moh-darkGreen">{t('home.featured.stories.title')}</h3>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {successStories.map((story, index) => (
                  <div key={index} className="min-w-full">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="h-64 md:h-auto overflow-hidden">
                            <img 
                              src={story.image} 
                              alt={t(story.titleKey)} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex flex-col justify-center">
                            <div className="text-sm font-medium text-moh-gold mb-2">
                              {t(story.categoryKey)}
                            </div>
                            <h4 className="text-xl font-semibold text-moh-darkGreen mb-3">
                              {t(story.titleKey)}
                            </h4>
                            <p className="text-gray-700 mb-4">
                              {t(story.descriptionKey)}
                            </p>
                            <Button 
                              variant="outline" 
                              className="border-moh-green text-moh-green self-start"
                            >
                              {t('home.featured.readMore')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-between mt-6">
              <div className="flex gap-2">
                {successStories.map((_, index) => (
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
                  className="rounded-full w-10 h-10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={nextSlide}
                  className="rounded-full w-10 h-10"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
