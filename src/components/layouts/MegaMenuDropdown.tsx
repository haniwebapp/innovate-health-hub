
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 w-screen max-w-5xl z-50 overflow-hidden"
    >
      <div className="flex p-6 gap-6">
        {categories.map((category, idx) => (
          <div key={idx} className="flex-1 min-w-[250px]">
            <h4 className="font-medium text-moh-darkGreen mb-4 pb-2 border-b border-gray-100">
              {category.title}
            </h4>
            <ul className="space-y-2">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link 
                    to={item.path}
                    className="text-gray-600 hover:text-moh-green flex items-center py-1 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Discover more resources and tools in the {categories[0]?.title?.toLowerCase() || ""} section
        </p>
        <Link 
          to={categories[0]?.items[0]?.path || "#"}
          className="text-sm text-moh-green hover:text-moh-darkGreen font-medium"
        >
          View All
        </Link>
      </div>
    </motion.div>
  );
}
