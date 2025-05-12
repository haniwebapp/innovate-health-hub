
import { Brain, FlaskConical, TrendingUp, BookOpen, Award, Users, HeartPulse, Globe } from "lucide-react";
import React from "react";

export interface Feature {
  iconName: string;
  title: string;
  description: string;
  ctaLink: string;
  color?: string;
}

export const features: Feature[] = [
  {
    iconName: "Brain",
    title: "AI-Powered Matching",
    description: "Advanced algorithms connect innovations with the right investors and opportunities.",
    ctaLink: "/innovations",
    color: "green"
  },
  {
    iconName: "FlaskConical",
    title: "Regulatory Sandbox",
    description: "Test your healthcare innovations in a safe and compliant environment.",
    ctaLink: "/regulatory",
    color: "gold"
  },
  {
    iconName: "TrendingUp",
    title: "Investment Marketplace",
    description: "Connect with investors looking to fund the next healthcare breakthrough.",
    ctaLink: "/investment",
    color: "darkGreen"
  },
  {
    iconName: "BookOpen",
    title: "Knowledge Hub",
    description: "Access curated resources and expertise to accelerate your innovation journey.",
    ctaLink: "/knowledge-hub",
    color: "darkGold"
  },
  {
    iconName: "Award",
    title: "Challenge Platform",
    description: "Participate in healthcare challenges and drive meaningful innovation.",
    ctaLink: "/challenges",
    color: "green"
  }
];

// Function to get the appropriate icon component
export function getIconByName(name: string) {
  const icons: { [key: string]: React.ElementType } = {
    Brain,
    FlaskConical,
    TrendingUp,
    BookOpen,
    Award,
    Users,
    HeartPulse,
    Globe
  };
  
  return icons[name] || Award;
}
