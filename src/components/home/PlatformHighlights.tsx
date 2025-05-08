
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function PlatformHighlights() {
  const titleRef = useRef<HTMLDivElement>(null);
  
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
      title: "AI-Powered Innovation Matching",
      description: "Our advanced AI algorithms connect innovators with the right investors, mentors, and resources."
    },
    {
      icon: "🔬",
      title: "Regulatory Sandbox Access",
      description: "Test your innovations in a controlled environment with direct access to MOH regulatory guidance."
    },
    {
      icon: "📈",
      title: "Investment Marketplace",
      description: "Connect with qualified investors seeking to fund the next breakthrough in healthcare innovation."
    },
    {
      icon: "📚",
      title: "Knowledge Hub",
      description: "Access resources, case studies, and best practices to accelerate your innovation journey."
    },
    {
      icon: "🧪",
      title: "Challenge Submissions",
      description: "Participate in MOH-sponsored innovation challenges to solve critical healthcare problems."
    },
    {
      icon: "🌐",
      title: "Global Health Network",
      description: "Connect with international partners and access global health innovation trends and insights."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-moh-gray/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
            Platform Highlights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
            Your Complete Innovation Ecosystem
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg">
            Our comprehensive suite of tools and services designed to support healthcare innovators 
            at every stage of development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={(index + 1) * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
