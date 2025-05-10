
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

interface MenuItem {
  label: string;
  path: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

interface MegaMenuDropdownProps {
  categories: MenuCategory[];
}

export default function MegaMenuDropdown({ categories }: MegaMenuDropdownProps) {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl border border-gray-100 w-screen max-w-6xl z-50 overflow-hidden"
    >
      <motion.div 
        className="flex p-8 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category, idx) => (
          <motion.div key={idx} className="flex-1 min-w-[250px]" variants={itemVariants}>
            <h3 className="font-medium text-[16px] text-moh-green mb-4 pb-2 border-b border-gray-100">
              {category.title}
            </h3>
            <ul className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <motion.li 
                  key={itemIdx}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link 
                    to={item.path}
                    className="text-[15px] text-gray-700 hover:text-moh-green flex items-center py-1 transition-colors group"
                  >
                    <span className="group-hover:underline">{item.label}</span>
                    <ArrowRight className="h-3 w-0 ml-1 opacity-0 group-hover:w-3 group-hover:opacity-100 transition-all duration-200" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="bg-gradient-to-r from-moh-lightGreen/50 to-moh-lightGreen/20 p-5 flex justify-between items-center">
        <p className="text-[15px] text-gray-700">
          Discover the latest resources, tools and opportunities in {categories[0]?.title?.toLowerCase() || ""}
        </p>
        <Link 
          to={categories[0]?.items[0]?.path || "#"}
          className="text-[15px] font-medium text-white bg-moh-green hover:bg-moh-darkGreen rounded-full px-5 py-2 transition-colors flex items-center gap-2"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
