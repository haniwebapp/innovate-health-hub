import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
interface Innovation {
  id: string;
  title: string;
  image: string;
  category: string;
  trl: number; // Technology Readiness Level
  featured: boolean;
  summary: string;
}

// Sample data - this would come from an API in a real application
const innovationsMock: Innovation[] = [{
  id: "1",
  title: "AI-Powered Diabetes Monitoring",
  image: "/lovable-uploads/490e4e1f-9428-448f-87b4-1ee68f24331c.png",
  category: "Digital Health",
  trl: 7,
  featured: true,
  summary: "Continuous glucose monitoring with AI-powered insights and predictive analytics."
}, {
  id: "2",
  title: "Remote Patient Monitoring System",
  image: "/lovable-uploads/5993dbad-5475-4d1f-b16c-a18b49bdb942.png",
  category: "Telehealth",
  trl: 8,
  featured: true,
  summary: "End-to-end platform for remote patient monitoring with integrated vital signs tracking."
}, {
  id: "3",
  title: "Smart Hospital Management Suite",
  image: "/lovable-uploads/5a9acce6-713e-4091-9221-498fa246c6d3.png",
  category: "Healthcare IT",
  trl: 6,
  featured: false,
  summary: "Comprehensive hospital management system with resource optimization algorithms."
}, {
  id: "4",
  title: "Portable Diagnostic Device",
  image: "/lovable-uploads/7502fd8d-a2d2-4400-ad7a-4acb41cd43e1.png",
  category: "MedTech",
  trl: 5,
  featured: false,
  summary: "Handheld device capable of running multiple diagnostic tests with cloud connectivity."
}, {
  id: "5",
  title: "Mental Health Tracking App",
  image: "/lovable-uploads/8740809b-3739-46bc-927a-4787dc7ca177.png",
  category: "Digital Health",
  trl: 9,
  featured: true,
  summary: "App for tracking mental well-being with personalized recommendations and professional support."
}];

// Filter options
const categories = ["All", "Digital Health", "Telehealth", "MedTech", "Healthcare IT"];
const trlLevels = ["All", "Early Stage (1-3)", "Mid Stage (4-6)", "Late Stage (7-9)"];
export default function InnovationGallery() {
  const {
    t,
    language
  } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTRL, setActiveTRL] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Filter innovations based on selected filters
  const filteredInnovations = innovationsMock.filter(innovation => {
    const categoryMatch = activeFilter === "All" || innovation.category === activeFilter;
    let trlMatch = true;
    if (activeTRL === "Early Stage (1-3)") {
      trlMatch = innovation.trl >= 1 && innovation.trl <= 3;
    } else if (activeTRL === "Mid Stage (4-6)") {
      trlMatch = innovation.trl >= 4 && innovation.trl <= 6;
    } else if (activeTRL === "Late Stage (7-9)") {
      trlMatch = innovation.trl >= 7 && innovation.trl <= 9;
    }
    const featuredMatch = featuredOnly ? innovation.featured : true;
    return categoryMatch && trlMatch && featuredMatch;
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  return;
}