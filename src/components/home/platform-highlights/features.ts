
import { ReactNode } from 'react';
import { Brain, FileText, TrendingUp, BookOpen, Beaker } from "lucide-react";

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLink: string;
}

// Using direct English text without translation keys
export const features: Feature[] = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Innovation Matching",
    description: "Our advanced AI algorithms match your innovations with the right investors, challenges, and regulatory pathways for optimal success.",
    ctaLink: "/ai-matching"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Regulatory Sandbox Access",
    description: "Test your healthcare solutions in a controlled environment with direct access to Ministry of Health guidance and support.",
    ctaLink: "/regulatory"
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Investment Marketplace",
    description: "Connect directly with qualified healthcare investors looking for innovation opportunities in the Saudi healthcare sector.",
    ctaLink: "/investment"
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Knowledge Hub",
    description: "Access curated resources, research, and insights to help accelerate your healthcare innovation journey.",
    ctaLink: "/knowledge-hub"
  },
  {
    icon: <Beaker className="h-6 w-6" />,
    title: "Challenge Submissions",
    description: "Participate in healthcare innovation challenges posed by the Ministry of Health and other stakeholders.",
    ctaLink: "/challenges"
  }
];
