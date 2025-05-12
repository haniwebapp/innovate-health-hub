
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface MedicalBreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPage?: string;
}

export default function MedicalBreadcrumbs({ items, currentPage }: MedicalBreadcrumbsProps) {
  const allItems = [...items];
  
  if (currentPage) {
    allItems.push({ label: currentPage, href: '#' });
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  
  return (
    <motion.nav 
      className="flex items-center text-sm text-gray-500 mb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link to="/" className="flex items-center hover:text-moh-green transition-colors">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
      </motion.div>
      
      <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0 text-gray-400" />
      
      {allItems.map((item, index) => (
        <React.Fragment key={index}>
          <motion.div 
            variants={itemVariants}
            className={index === allItems.length - 1 ? 'flex items-center font-medium text-moh-darkGreen' : 'flex items-center'}
          >
            {index === allItems.length - 1 ? (
              <span>{item.label}</span>
            ) : (
              <Link 
                to={item.href} 
                className="hover:text-moh-green transition-colors"
              >
                {item.label}
              </Link>
            )}
          </motion.div>
          
          {index < allItems.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </motion.nav>
  );
}
