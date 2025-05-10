
import { motion } from "framer-motion";
import InnovationCard from "@/components/innovations/InnovationCard";
import { Button } from "@/components/ui/button";
import { Innovation } from "@/types/innovations";
import { ChevronRight } from "lucide-react";

interface InnovationsListProps {
  innovations: Innovation[];
  viewMode: "grid" | "list";
  isFirstRender: boolean;
}

export default function InnovationsList({ 
  innovations, 
  viewMode, 
  isFirstRender 
}: InnovationsListProps) {
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
        stiffness: 260,
        damping: 20
      }
    }
  };

  if (innovations.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium text-moh-darkGreen mb-2">No innovations found</h3>
        <p className="text-gray-600">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <>
      {viewMode === "grid" ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial={isFirstRender ? "hidden" : false}
          animate="visible"
        >
          {innovations.map((innovation) => (
            <motion.div key={innovation.id} variants={itemVariants}>
              <InnovationCard innovation={innovation} view="grid" />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial={isFirstRender ? "hidden" : false}
          animate="visible"
        >
          {innovations.map((innovation) => (
            <motion.div key={innovation.id} variants={itemVariants}>
              <InnovationCard innovation={innovation} view="list" />
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {innovations.length > 0 && (
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button 
            variant="outline" 
            className="border-2 border-moh-green text-moh-green hover:bg-moh-lightGreen/30 group flex items-center gap-2 px-6 py-2"
          >
            Load More Innovations
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      )}
    </>
  );
}
