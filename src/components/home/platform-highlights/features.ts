
import React from "react";
import { 
  Sparkles, 
  Users, 
  FileText, 
  BarChart3, 
  Calendar 
} from "lucide-react";

export const features = [
  {
    iconName: "Sparkles",
    title: "Innovation Hub",
    description: "Discover and submit cutting-edge healthcare solutions addressing Saudi Arabia's unique challenges.",
    ctaLink: "/innovations"
  },
  {
    iconName: "Users",
    title: "Collaboration Network",
    description: "Connect with healthcare professionals, investors, and fellow innovators across the Kingdom.",
    ctaLink: "/network"
  },
  {
    iconName: "FileText",
    title: "Regulatory Guidance",
    description: "Navigate the healthcare regulatory landscape with expert guidance and resources.",
    ctaLink: "/regulatory"
  },
  {
    iconName: "BarChart3",
    title: "Investment Platform",
    description: "Access funding opportunities and connect with investors looking for healthcare innovations.",
    ctaLink: "/investment"
  },
  {
    iconName: "Calendar",
    title: "Innovation Challenges",
    description: "Participate in challenges addressing critical healthcare needs with prizes and implementation support.",
    ctaLink: "/challenges"
  }
];

// Helper function to get icon component based on name
export const getIconByName = (name: string, className: string = "h-5 w-5") => {
  switch (name) {
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Users":
      return <Users className={className} />;
    case "FileText":
      return <FileText className={className} />;
    case "BarChart3":
      return <BarChart3 className={className} />;
    case "Calendar":
      return <Calendar className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
