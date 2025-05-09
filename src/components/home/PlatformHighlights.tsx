
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeatureCardProps {
  icon: string;
  titleKey: string;
  descriptionKey: string;
  delay: number;
}

const FeatureCard = ({ icon, titleKey, descriptionKey, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (cardRef.current) {
            cardRef.current.classList.remove('opacity-0');
            cardRef.current.classList.add('animate-fade-in');
            cardRef.current.style.animationDelay = `${delay}ms`;
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div ref={cardRef} className="opacity-0">
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-moh-lightGreen rounded-full opacity-70 group-hover:scale-150 transition-transform duration-500"></div>
        <CardHeader className="pb-2 relative">
          <div className="text-4xl mb-4">{icon}</div>
          <CardTitle className="text-xl text-moh-darkGreen font-bold group-hover:text-moh-green transition-colors">
            {t(titleKey)}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-gray-600">{t(descriptionKey)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function PlatformHighlights() {
  const titleRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.classList.remove('opacity-0');
            titleRef.current.classList.add('animate-fade-in');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: "🧠",
      titleKey: "home.highlights.feature1.title",
      descriptionKey: "home.highlights.feature1.description"
    },
    {
      icon: "🔬",
      titleKey: "home.highlights.feature2.title",
      descriptionKey: "home.highlights.feature2.description"
    },
    {
      icon: "📈",
      titleKey: "home.highlights.feature3.title",
      descriptionKey: "home.highlights.feature3.description"
    },
    {
      icon: "📚",
      titleKey: "home.highlights.feature4.title",
      descriptionKey: "home.highlights.feature4.description"
    },
    {
      icon: "🧪",
      titleKey: "home.highlights.feature5.title",
      descriptionKey: "home.highlights.feature5.description"
    },
    {
      icon: "🌐",
      titleKey: "home.highlights.feature6.title",
      descriptionKey: "home.highlights.feature6.description"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-moh-gray/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
            {t('home.highlights.tag')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
            {t('home.highlights.title')}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg">
            {t('home.highlights.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              titleKey={feature.titleKey}
              descriptionKey={feature.descriptionKey}
              delay={(index + 1) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
