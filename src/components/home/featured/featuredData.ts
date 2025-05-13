
import { Stat } from "./StatsSection";
import { SuccessStory } from "./StoryCard";

export const statsData: Stat[] = [
  {
    value: 325,
    label: "Active Innovators",
    suffix: "+"
  }, 
  {
    value: 42,
    label: "Total Investment (SAR)",
    suffix: "M"
  }, 
  {
    value: 18,
    label: "Solutions Launched",
    suffix: ""
  }, 
  {
    value: 95,
    label: "Implementation Success Rate",
    suffix: "%"
  }
];

export const successStoriesData: SuccessStory[] = [
  {
    title: "AI-Powered Diagnostic Tool",
    category: "Digital Diagnostics",
    description: "An AI solution that helps radiologists detect abnormalities in medical images with 95% accuracy.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
  }, 
  {
    title: "Smart Hospital Management System",
    category: "Healthcare Operations",
    description: "A comprehensive system that reduced administrative workload by 40% in 15 hospitals across the Kingdom.",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80"
  }, 
  {
    title: "Patient Engagement Platform",
    category: "Patient Experience",
    description: "A mobile platform that improved medication adherence by 60% for chronic disease patients.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
  }
];
