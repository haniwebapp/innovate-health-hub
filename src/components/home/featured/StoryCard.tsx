
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export interface SuccessStory {
  title: string;
  category: string;
  description: string;
  image: string;
}

interface StoryCardProps {
  story: SuccessStory;
  index: number;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, index }) => {
  return (
    <div className="min-w-full">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-64 md:h-auto overflow-hidden">
              <motion.img 
                src={story.image} 
                alt={story.title} 
                className="w-full h-full object-cover" 
                whileHover={{
                  scale: 1.05
                }} 
                transition={{
                  duration: 0.5
                }} 
              />
            </div>
            <ScrollFadeIn delay={0.4 + index * 0.1} className="p-6 flex flex-col justify-center" direction="left">
              <div className="text-sm font-medium text-moh-gold mb-2">
                {story.category}
              </div>
              <h4 className="text-xl font-semibold text-moh-darkGreen mb-3">
                {story.title}
              </h4>
              <p className="text-gray-700 mb-4">
                {story.description}
              </p>
              <Button 
                variant="outline" 
                className="border-moh-green text-moh-green self-start group hover:bg-moh-lightGreen transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Read More</span>
                <motion.span 
                  className="absolute inset-0 bg-moh-green/10 rounded-md z-0"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1, 
                    opacity: 1, 
                    transition: { duration: 0.3 } 
                  }}
                />
                <motion.span 
                  className="inline-block ml-1 relative z-10"
                  animate={{
                    x: [0, 3, 0]
                  }} 
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1
                  }}
                >
                  →
                </motion.span>
              </Button>
            </ScrollFadeIn>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
