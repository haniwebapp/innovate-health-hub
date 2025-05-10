
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tags } from "lucide-react";

interface TagFilterSectionProps {
  allTags: string[];
  tagFilter: string | null;
  setTagFilter: (tag: string | null) => void;
}

export default function TagFilterSection({
  allTags,
  tagFilter,
  setTagFilter
}: TagFilterSectionProps) {
  // Take only the first 15 tags to avoid overcrowding
  const popularTags = allTags.slice(0, 15);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-3">
        <Tags size={16} className="text-moh-darkGreen" />
        <h3 className="text-moh-darkGreen font-medium">Popular Tags</h3>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <Badge 
            variant={tagFilter === null ? "default" : "outline"}
            className={`cursor-pointer ${tagFilter === null ? 'bg-moh-green hover:bg-moh-darkGreen' : 'hover:bg-moh-lightGreen/50 border-moh-green/30'}`}
            onClick={() => setTagFilter(null)}
          >
            All Tags
          </Badge>
        </motion.div>
        
        {popularTags.map((tag) => (
          <motion.div key={tag} variants={childVariants}>
            <Badge 
              variant={tagFilter === tag ? "default" : "outline"}
              className={`cursor-pointer ${tagFilter === tag ? 'bg-moh-green hover:bg-moh-darkGreen' : 'hover:bg-moh-lightGreen/50 border-moh-green/30'}`}
              onClick={() => setTagFilter(tag)}
            >
              {tag}
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
