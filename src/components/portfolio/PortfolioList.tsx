
import React from 'react';
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { PortfolioCard } from "./PortfolioCard";

// Define motion animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface Investment {
  id: number;
  name: string;
  logo: string;
  sector: string;
  stage: string;
  investmentAmount: string;
  roi: string;
  date: string;
  trend: string;
  status: string;
}

interface PortfolioListProps {
  filteredPortfolio: Investment[];
}

export function PortfolioList({ filteredPortfolio }: PortfolioListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredPortfolio.map((investment) => (
        <PortfolioCard key={investment.id} investment={investment} />
      ))}
      
      {filteredPortfolio.length === 0 && (
        <motion.div 
          className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground"
          variants={itemVariants}
        >
          <Briefcase className="h-12 w-12 mb-2 text-moh-green/30" />
          <p className="text-lg font-medium">No investments found</p>
          <p className="text-sm">Try adjusting your search criteria</p>
        </motion.div>
      )}
    </motion.div>
  );
}
