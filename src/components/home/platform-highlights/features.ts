
import { Brain, FileText, TrendingUp, BookOpen, Beaker } from "lucide-react";

export interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  ctaLink: string;
}

export const getFeatures = (t: (key: string) => string): Feature[] => [
  {
    icon: <Brain className="h-6 w-6" />,
    title: t('home.features.ai.title') || "AI-Powered Innovation Matching",
    description: t('home.features.ai.description') || "Our advanced AI algorithms match your innovations with the right investors, challenges, and regulatory pathways for optimal success.",
    ctaLink: "/ai-matching"
  }, 
  {
    icon: <FileText className="h-6 w-6" />,
    title: t('home.features.regulatory.title') || "Regulatory Sandbox Access",
    description: t('home.features.regulatory.description') || "Test your healthcare solutions in a controlled environment with direct access to Ministry of Health guidance and support.",
    ctaLink: "/regulatory"
  }, 
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: t('home.features.investment.title') || "Investment Marketplace",
    description: t('home.features.investment.description') || "Connect directly with qualified healthcare investors looking for innovation opportunities in the Saudi healthcare sector.",
    ctaLink: "/investment"
  }, 
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: t('home.features.knowledge.title') || "Knowledge Hub",
    description: t('home.features.knowledge.description') || "Access curated resources, research, and insights to help accelerate your healthcare innovation journey.",
    ctaLink: "/knowledge-hub"
  }, 
  {
    icon: <Beaker className="h-6 w-6" />,
    title: t('home.features.challenges.title') || "Challenge Submissions",
    description: t('home.features.challenges.description') || "Participate in healthcare innovation challenges posed by the Ministry of Health and other stakeholders.",
    ctaLink: "/challenges"
  }
];
