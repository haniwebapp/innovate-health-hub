
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileUp } from "lucide-react";

interface MobileMenuLinksProps {
  navigationLinks: {
    path: string;
    label: string;
    icon: any;
  }[];
  isRouteActive: (path: string) => boolean;
  handleLinkClick: (path: string) => void;
  itemVariants: any;
}

export function MobileMenuLinks({ 
  navigationLinks, 
  isRouteActive, 
  handleLinkClick,
  itemVariants 
}: MobileMenuLinksProps) {
  return (
    <nav className="flex flex-col">
      <motion.div className="mb-4" variants={itemVariants}>
        <div className="py-2 px-4 bg-moh-lightGreen/50 rounded-xl mb-6">
          <Button 
            className="w-full bg-moh-green hover:bg-moh-darkGreen mb-2" 
            onClick={() => handleLinkClick("/innovations/submit")}
            asChild
          >
            <Link to="/innovations/submit" className="flex items-center justify-center gap-2">
              <FileUp className="h-4 w-4" />
              Submit an Innovation
            </Link>
          </Button>
        </div>
      </motion.div>
      
      {navigationLinks.map((link, index) => (
        <motion.div key={link.path} variants={itemVariants} custom={index}>
          <Button
            variant="ghost"
            className={`w-full justify-start text-left py-3 text-lg font-medium flex items-center gap-3 ${
              isRouteActive(link.path)
                ? "text-moh-green"
                : "text-moh-darkGreen"
            }`}
            onClick={() => handleLinkClick(link.path)}
            asChild
          >
            <Link to={link.path}>
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        </motion.div>
      ))}
    </nav>
  );
}
