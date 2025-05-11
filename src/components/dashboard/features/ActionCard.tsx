
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ActionCardProps {
  title: string;
  description: string;
  content: string;
  link: string;
  linkText: string;
  icon: LucideIcon;
  badges?: string[];
  variant?: "green" | "gold";
  delay?: number;
}

export default function ActionCard({
  title,
  description,
  content,
  link,
  linkText,
  icon: Icon,
  badges = [],
  variant = "green",
  delay = 0
}: ActionCardProps) {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, delay }
  };
  
  const colorClasses = {
    green: {
      border: "border-moh-lightGreen hover:border-moh-green",
      gradient: "from-moh-lightGreen to-moh-lightGold",
      icon: "text-moh-darkGreen",
      title: "text-moh-darkGreen",
      description: "text-moh-darkGreen/80",
      badge: "bg-moh-lightGreen/20 text-moh-darkGreen",
      button: "from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green"
    },
    gold: {
      border: "border-moh-lightGold hover:border-moh-gold",
      gradient: "from-moh-lightGold to-moh-lightGreen",
      icon: "text-moh-darkGold",
      title: "text-moh-darkGold",
      description: "text-moh-darkGold/80",
      badge: "bg-moh-lightGold/20 text-moh-darkGold",
      button: "from-moh-gold to-moh-darkGold hover:from-moh-darkGold hover:to-moh-gold"
    }
  };
  
  const colors = colorClasses[variant];

  return (
    <motion.div {...fadeInUp} transition={{ delay }}>
      <Card className={`overflow-hidden border-2 ${colors.border} transition-colors`}>
        <CardHeader className={`bg-gradient-to-r ${colors.gradient} pb-8`}>
          <div className="absolute right-4 top-4 bg-white/20 p-2 rounded-full">
            <Icon size={24} className={colors.icon} />
          </div>
          <CardTitle className={`${colors.title} text-xl`}>{title}</CardTitle>
          <CardDescription className={colors.description}>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground mb-6">
            {content}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {badges.map((badge, index) => (
                <Badge key={index} variant="outline" className={colors.badge}>
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button asChild size="lg" className={`w-full bg-gradient-to-r ${colors.button}`}>
            <Link to={link}>
              {linkText}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
