
import { ReactNode } from 'react';
import { Brain, FileText, TrendingUp, BookOpen, Beaker } from "lucide-react";

export interface Feature {
  iconName: string;
  title: string;
  description: string;
  ctaLink: string;
}

// Using direct English text without translation keys
export const features: Feature[] = [
  {
    iconName: "Brain",
    title: "AI-Powered Innovation Matching",
    description: "Our advanced AI algorithms match your innovations with the right investors, challenges, and regulatory pathways for optimal success.",
    ctaLink: "/ai-matching"
  },
  {
    iconName: "FileText",
    title: "Regulatory Sandbox Access",
    description: "Test your healthcare solutions in a controlled environment with direct access to Ministry of Health guidance and support.",
    ctaLink: "/regulatory"
  },
  {
    iconName: "TrendingUp",
    title: "Investment Marketplace",
    description: "Connect directly with qualified healthcare investors looking for innovation opportunities in the Saudi healthcare sector.",
    ctaLink: "/investment"
  },
  {
    iconName: "BookOpen",
    title: "Knowledge Hub",
    description: "Access curated resources, research, and insights to help accelerate your healthcare innovation journey.",
    ctaLink: "/knowledge-hub"
  },
  {
    iconName: "Beaker",
    title: "Challenge Submissions",
    description: "Participate in healthcare innovation challenges posed by the Ministry of Health and other stakeholders.",
    ctaLink: "/challenges"
  }
];

// Map of icon names to their components
export const getIconByName = (name: string, className: string): ReactNode => {
  switch (name) {
    case 'Brain':
      return <Brain className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'TrendingUp':
      return <TrendingUp className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Beaker':
      return <Beaker className={className} />;
    default:
      return null;
  }
};
