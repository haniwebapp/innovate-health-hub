
import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HighlightsSectionHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
}

export function HighlightsSectionHeader({ tag, title, subtitle }: HighlightsSectionHeaderProps) {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
        {tag}
      </span>
      
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
        {title}
      </h2>
      
      <p className="max-w-2xl mx-auto text-gray-700">
        {subtitle}
      </p>
    </motion.div>
  );
}
