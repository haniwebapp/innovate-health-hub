
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Feature } from "@/components/home/platform-highlights/features";
import { getIconByName } from "@/components/home/platform-highlights/features";

interface FeatureCardProps {
  feature: Feature;
}

// Helper function to get color classes based on the color
export function getColorClasses(color: string): {
  bg: string;
  text: string;
  border: string;
  hover: string;
} {
  const colorMap: {[key: string]: {bg: string, text: string, border: string, hover: string}} = {
    green: {
      bg: "bg-moh-lightGreen/50",
      text: "text-moh-green",
      border: "border-moh-green/20",
      hover: "hover:bg-moh-lightGreen/80"
    },
    gold: {
      bg: "bg-moh-lightGold/50",
      text: "text-moh-darkGold",
      border: "border-moh-gold/20",
      hover: "hover:bg-moh-lightGold/80"
    },
    darkGreen: {
      bg: "bg-moh-lightGreen/60",
      text: "text-moh-darkGreen",
      border: "border-moh-darkGreen/20",
      hover: "hover:bg-moh-lightGreen/90"
    },
    darkGold: {
      bg: "bg-moh-lightGold/60",
      text: "text-moh-darkGold",
      border: "border-moh-darkGold/20",
      hover: "hover:bg-moh-lightGold/90"
    }
  };
  
  return colorMap[color] || colorMap.green;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const navigate = useNavigate();
  const IconComponent = getIconByName(feature.iconName);
  const colorClasses = getColorClasses(feature.color || "green");
  
  // Helper function to generate expanded descriptions for features
  function getExpandedDescription(title: string): string {
    switch(title) {
      case "AI-Powered Matching":
        return "Our advanced algorithms analyze innovation characteristics and match them with relevant investors, challenges, and opportunities based on over 50 different parameters.";
      case "Regulatory Sandbox":
        return "Test healthcare solutions in a controlled environment with direct guidance from regulatory experts and Ministry of Health representatives for faster approvals.";
      case "Investment Marketplace":
        return "Connect with vetted investors specifically interested in healthcare innovations, with detailed profiles and automated matching to maximize funding potential.";
      case "Knowledge Hub":
        return "Access a centralized repository of research papers, case studies, best practices, and expert insights curated specifically for healthcare innovators.";
      case "Challenge Platform":
        return "Participate in healthcare innovation challenges posed by various stakeholders, gain visibility, and win potential funding and implementation opportunities.";
      default:
        return "Explore this feature to unlock more capabilities within our healthcare innovation platform.";
    }
  }

  return (
    <Card className="h-full border border-gray-200 hover:border-moh-green/30 hover:shadow-md transition-all duration-300">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-4`}>
          <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
        </div>
        <CardTitle className={`${colorClasses.text}`}>{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          {getExpandedDescription(feature.title)}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="ghost"
          className={`${colorClasses.text} hover:bg-transparent hover:opacity-80 p-0 h-auto font-medium text-sm group`}
          onClick={() => navigate(feature.ctaLink)}
        >
          Learn More
          <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
