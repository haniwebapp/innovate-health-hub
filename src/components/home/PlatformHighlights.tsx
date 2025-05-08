
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <Card className={`opacity-0 animate-fade-in card-hover animation-delay-${delay}`}>
      <CardHeader className="pb-2">
        <div className="text-3xl text-moh-green mb-4">{icon}</div>
        <CardTitle className="text-xl text-moh-darkGreen">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default function PlatformHighlights() {
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
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-moh-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
            Platform Highlights
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Our comprehensive suite of tools and services designed to support healthcare innovators 
            at every stage of development.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
