
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { categories, trlLevels } from "./types";
import { motion } from "framer-motion";

interface FilterControlsProps {
  activeFilter: string;
  activeTRL: string;
  featuredOnly: boolean;
  onFilterChange: (filter: string) => void;
  onTRLChange: (trl: string) => void;
  onFeaturedToggle: () => void;
}

export const FilterControls = ({
  activeFilter,
  activeTRL,
  featuredOnly,
  onFilterChange,
  onTRLChange,
  onFeaturedToggle
}: FilterControlsProps) => {
  return (
    <motion.div 
      className="mb-8 flex flex-col md:flex-row gap-4 justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant="outline"
            className={`cursor-pointer px-3 py-1 ${
              activeFilter === category 
                ? 'bg-moh-lightGreen text-moh-darkGreen border-moh-green' 
                : 'hover:bg-moh-lightGreen/30 hover:text-moh-darkGreen'
            }`}
            onClick={() => onFilterChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {trlLevels.map((trl) => (
          <Badge
            key={trl}
            variant="outline"
            className={`cursor-pointer px-3 py-1 ${
              activeTRL === trl 
                ? 'bg-moh-lightGold text-moh-darkGold border-moh-gold' 
                : 'hover:bg-moh-lightGold/30 hover:text-moh-darkGold'
            }`}
            onClick={() => onTRLChange(trl)}
          >
            {trl}
          </Badge>
        ))}
      </div>
      
      <Badge
        variant="outline"
        className={`cursor-pointer px-3 py-1 ${
          featuredOnly 
            ? 'bg-moh-gold/30 text-moh-darkGold border-moh-gold' 
            : 'hover:bg-moh-gold/10 hover:text-moh-darkGold'
        }`}
        onClick={onFeaturedToggle}
      >
        <Star className={`h-4 w-4 mr-1 ${featuredOnly ? 'text-moh-gold fill-moh-gold' : ''}`} />
        Featured Only
      </Badge>
    </motion.div>
  );
};
