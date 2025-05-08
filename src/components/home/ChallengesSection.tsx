
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChallengeCardProps {
  title: string;
  description: string;
  deadline: string;
  category: string;
  participants: number;
  prize: string;
  delay: number;
}

const ChallengeCard = ({ 
  title, description, deadline, category, participants, prize, delay 
}: ChallengeCardProps) => {
  return (
    <Card className={`opacity-0 animate-fade-in card-hover animation-delay-${delay}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-moh-gold hover:bg-moh-darkGold">{category}</Badge>
          <div className="text-sm text-moh-darkGreen flex items-center gap-1">
            <span className="w-2 h-2 bg-moh-green rounded-full inline-block"></span>
            <span>Deadline: {deadline}</span>
          </div>
        </div>
        <CardTitle className="text-xl text-moh-darkGreen mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{participants} Participants</span>
          <span>Prize: {prize}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-moh-green hover:bg-moh-darkGreen text-white">
          View Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function ChallengesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const cards = element.querySelectorAll('.card-hover');
          cards.forEach((card) => {
            card.classList.add('animate-fade-in');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const challenges = [
    {
      title: "Remote Patient Monitoring Solutions",
      description: "Design innovative solutions for monitoring patients with chronic conditions in remote areas of the Kingdom.",
      deadline: "June 30, 2025",
      category: "Digital Health",
      participants: 47,
      prize: "SAR 500,000"
    },
    {
      title: "AI for Early Disease Detection",
      description: "Develop AI algorithms to detect early signs of diseases using existing health data from MOH facilities.",
      deadline: "July 15, 2025",
      category: "AI & Machine Learning",
      participants: 32,
      prize: "SAR 750,000"
    },
    {
      title: "Healthcare Supply Chain Optimization",
      description: "Create solutions to improve the efficiency and resilience of medical supply chains across Saudi Arabia.",
      deadline: "August 22, 2025",
      category: "Logistics",
      participants: 21,
      prize: "SAR 350,000"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-moh-lightGreen bg-opacity-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-moh-darkGreen">
              Upcoming Innovation Challenges
            </h2>
            <p className="text-gray-700 max-w-3xl">
              Join MOH-sponsored challenges to solve critical healthcare issues and 
              unlock funding opportunities.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-moh-green text-moh-green"
          >
            View All Challenges
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <ChallengeCard 
              key={index}
              title={challenge.title}
              description={challenge.description}
              deadline={challenge.deadline}
              category={challenge.category}
              participants={challenge.participants}
              prize={challenge.prize}
              delay={(index + 1) * 100}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-moh-green rounded-full animate-pulse-soft"></div>
              <span className="text-moh-darkGreen font-medium">Next challenge submission deadline: June 30, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
