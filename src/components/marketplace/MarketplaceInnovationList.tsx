
import { Innovation } from "@/types/innovations";
import MarketplaceInnovationCard from "./MarketplaceInnovationCard";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface MarketplaceInnovationListProps {
  innovations: Innovation[];
  isLoading: boolean;
  viewMode: "grid" | "list";
}

export default function MarketplaceInnovationList({ 
  innovations, 
  isLoading,
  viewMode 
}: MarketplaceInnovationListProps) {
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      }
    }
  };
  
  // Loading skeletons
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="border rounded-lg p-4">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // No results
  if (innovations.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-medium mb-2">No innovations found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <motion.div 
      className={`grid grid-cols-1 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {innovations.map((innovation) => (
        <motion.div key={innovation.id} variants={itemVariants}>
          <MarketplaceInnovationCard innovation={innovation} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  );
}
