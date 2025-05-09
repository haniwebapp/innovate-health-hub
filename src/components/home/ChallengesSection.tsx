
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  category: string;
  participants: number;
  prize: string;
  delay: number;
  image: string;
}

const ChallengeCard = ({
  id,
  title,
  description,
  deadline,
  category,
  participants,
  prize,
  delay,
  image
}: ChallengeCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (cardRef.current) {
            cardRef.current.classList.remove('opacity-0');
            cardRef.current.classList.add('animate-fade-in');
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className="opacity-0" style={{animationDelay: `${delay}ms`}}>
      <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border-none">
        <div className="h-40 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className="bg-moh-gold hover:bg-moh-darkGold">{category}</Badge>
            <div className="text-sm text-moh-darkGreen flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Deadline: {deadline}</span>
            </div>
          </div>
          <CardTitle className="text-xl text-moh-darkGreen mt-2 group-hover:text-moh-green transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {participants} Participants
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-3 w-3" />
              Prize: {prize}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
            <Link to={`/challenges/${id}`}>
              View Challenge
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function ChallengesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (titleRef.current) {
            titleRef.current.classList.remove('opacity-0');
            titleRef.current.classList.add('animate-fade-in');
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const challenges = [
    {
      id: "1",
      title: "Remote Patient Monitoring Solutions",
      description: "Develop innovative solutions for monitoring patients with chronic conditions remotely.",
      deadline: "June 30, 2025",
      category: "Digital Health",
      participants: 47,
      prize: "SAR 500,000",
      image: "https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "2",
      title: "Hospital Resource Optimization",
      description: "Create AI-driven tools to optimize hospital resource allocation and improve operational efficiency.",
      deadline: "August 15, 2025",
      category: "Healthcare Operations",
      participants: 32,
      prize: "SAR 750,000",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: "3",
      title: "Mental Health Applications",
      description: "Design accessible mental health support applications tailored for Saudi citizens.",
      deadline: "September 22, 2025",
      category: "Mental Health",
      participants: 21,
      prize: "SAR 350,000",
      image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-moh-lightGreen/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 opacity-0">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4">
              Innovation Challenges
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen">
              Current Healthcare Challenges
            </h2>
            <p className="text-gray-700 max-w-3xl">
              Join our innovation challenges to solve pressing healthcare problems and make a difference in the Kingdom.
            </p>
          </div>
          <Button asChild variant="outline" className="mt-6 md:mt-0 border-moh-green text-moh-green hover:bg-moh-lightGreen group">
            <Link to="/challenges">
              View All Challenges
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={index}
              id={challenge.id}
              title={challenge.title}
              description={challenge.description}
              deadline={challenge.deadline}
              category={challenge.category}
              participants={challenge.participants}
              prize={challenge.prize}
              delay={(index + 1) * 150}
              image={challenge.image}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-lg p-6 shadow-lg border border-moh-lightGreen">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-moh-green rounded-full animate-pulse"></div>
              <span className="text-moh-darkGreen font-medium">Next Deadline: June 30, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
